import axios from "axios";
import sinon from "sinon";
import Checkout from "../../src/application/usecase/Checkout";
import CouponRepository from "../../src/application/repository/CouponRepository";
import CouponRepositoryDatabase from "../../src/infra/repository/CouponRepositoryDatabase";
import ProductRepository from "../../src/application/repository/ProductRepository";
import ProductRepositoryDatabase from "../../src/infra/repository/ProductRepositoryDatabase";
import crypto from "crypto";
import GetOrder from "../../src/application/usecase/GetOrder";
import OrderRepositoryDatabase from "../../src/infra/repository/OrderRepositoryDatabase";
import Product from "../../src/domain/entity/Product";
import Coupon from "../../src/domain/entity/Coupon";
import DatabaseRepositoryFactory from "../../src/infra/factory/DatabaseRepositoryFactory";
import RepositoryFactory from "../../src/application/factory/RepositoryFactory";
import PgPromiseAdapter from "../../src/infra/database/PgPromiseAdapter";
import DatabaseConnection from "../../src/infra/database/DatabaseConnection";

axios.defaults.validateStatus = function () {
	return true;
}

let checkout: Checkout;
let getOrder: GetOrder;
let repositoryFactory: RepositoryFactory;
let connection: DatabaseConnection;

beforeEach(async () => {
	connection = new PgPromiseAdapter();
	await connection.connect();
	repositoryFactory = new DatabaseRepositoryFactory(connection);
	checkout = new Checkout(repositoryFactory);
	getOrder = new GetOrder(repositoryFactory);
});

test("Não deve criar pedido com cpf inválido", async function () {
	const input = {
		cpf: "406.302.170-27",
		items: []
	};
	await expect(() => checkout.execute(input)).rejects.toThrow(new Error("Invalid cpf"));
});

test("Deve fazer um pedido com 3 itens", async function () {
	const input = {
		cpf: "407.302.170-27",
		items: [
			{ idProduct: 1, quantity: 1 },
			{ idProduct: 2, quantity: 1 },
			{ idProduct: 3, quantity: 3 }
		],
		email: "john.doe@gmail.com"
	};
	const output = await checkout.execute(input);
	expect(output.total).toBe(6090);
});

test("Deve fazer um pedido com 3 itens com cupom de desconto válido", async function () {
	const input = {
		cpf: "407.302.170-27",
		items: [
			{ idProduct: 1, quantity: 1 },
			{ idProduct: 2, quantity: 1 },
			{ idProduct: 3, quantity: 3 }
		],
		coupon: "VALE20"
	};
	const output = await checkout.execute(input);
	expect(output.total).toBe(4872);
});

test("Deve fazer um pedido com 3 itens com cupom de desconto expirado", async function () {
	const input = {
		cpf: "407.302.170-27",
		items: [
			{ idProduct: 1, quantity: 1 },
			{ idProduct: 2, quantity: 1 },
			{ idProduct: 3, quantity: 3 }
		],
		coupon: "VALE10"
	};
	const output = await checkout.execute(input);
	expect(output.total).toBe(6090);
});

test("Deve fazer um pedido com 3 itens com cupom de desconto que não existe", async function () {
	const input = {
		cpf: "407.302.170-27",
		items: [
			{ idProduct: 1, quantity: 1 },
			{ idProduct: 2, quantity: 1 },
			{ idProduct: 3, quantity: 3 }
		],
		coupon: "VALE0"
	};
	const output = await checkout.execute(input);
	expect(output.total).toBe(6090);
});

test("Não deve fazer um pedido com quantidade negativa de item", async function () {
	const input = {
		cpf: "407.302.170-27",
		items: [
			{ idProduct: 1, quantity: -1 }
		]
	};
	await expect(() => checkout.execute(input)).rejects.toThrow(new Error("Invalid quantity"));
});

test("Não deve fazer um pedido com item duplicado", async function () {
	const input = {
		cpf: "407.302.170-27",
		items: [
			{ idProduct: 1, quantity: 1 },
			{ idProduct: 1, quantity: 1 }
		]
	};
	await expect(() => checkout.execute(input)).rejects.toThrow(new Error("Duplicated item"));
});

test("Deve fazer um pedido com 3 itens calculando o frete", async function () {
	const input = {
		cpf: "407.302.170-27",
		items: [
			{ idProduct: 1, quantity: 1 },
			{ idProduct: 2, quantity: 1 }
		],
		from: "88015600",
		to: "22030060"
	};
	const output = await checkout.execute(input);
	expect(output.freight).toBe(250);
	expect(output.total).toBe(6250);
});

test("Deve fazer um pedido com 3 itens calculando o frete com preço mínimo", async function () {
	const input = {
		cpf: "407.302.170-27",
		items: [
			{ idProduct: 1, quantity: 1 },
			{ idProduct: 2, quantity: 1 },
			{ idProduct: 3, quantity: 3 }
		],
		from: "88015600",
		to: "22030060"
	};
	const output = await checkout.execute(input);
	expect(output.freight).toBe(280);
	expect(output.total).toBe(6370);
});

test("Deve fazer um pedido com 1 item com stub", async function () {
	const productRepositoryStub = sinon.stub(ProductRepositoryDatabase.prototype, "get").resolves(new Product(1, "A", 100, 1, 1, 1, 1));
	const input = {
		cpf: "407.302.170-27",
		items: [
			{ idProduct: 1, quantity: 1 }
		]
	};
	const output = await checkout.execute(input);
	expect(output.total).toBe(100);
	productRepositoryStub.restore();
});

test("Deve verificar se o email foi enviado usando um mock", async function () {
	const productRepositoryMock = sinon.mock(ProductRepositoryDatabase.prototype);
	productRepositoryMock.expects("get").once().resolves(new Product(1, "A", 100, 1, 1, 1, 1));
	const couponRepositorySpy = sinon.spy(CouponRepositoryDatabase.prototype, "get");
	const input = {
		cpf: "407.302.170-27",
		items: [
			{ idProduct: 1, quantity: 1 }
		],
		coupon: "VALE20"
	};
	const output = await checkout.execute(input);
	expect(output.total).toBe(80);
	productRepositoryMock.verify();
	expect(couponRepositorySpy.calledOnce).toBe(true);
	expect(couponRepositorySpy.calledWith("VALE20")).toBe(true);
	couponRepositorySpy.restore();
	productRepositoryMock.restore();
});

test("Deve fazer um pedido com 3 itens e obter o pedido salvo", async function () {
	const idOrder = crypto.randomUUID();
	const input = {
		idOrder,
		cpf: "407.302.170-27",
		items: [
			{ idProduct: 1, quantity: 1 },
			{ idProduct: 2, quantity: 1 },
			{ idProduct: 3, quantity: 3 }
		],
		email: "john.doe@gmail.com"
	};
	await checkout.execute(input);
	const output = await getOrder.execute(idOrder);
	expect(output.total).toBe(6090);
});

test("Deve fazer um pedido com 3 itens e gerar o código do pedido", async function () {
	const orderRepository = repositoryFactory.createOrderRepository();
	await orderRepository.clear();
	await checkout.execute({
		idOrder: crypto.randomUUID(),
		cpf: "407.302.170-27",
		items: [
			{ idProduct: 1, quantity: 1 },
			{ idProduct: 2, quantity: 1 },
			{ idProduct: 3, quantity: 3 }
		],
		email: "john.doe@gmail.com"
	});
	await checkout.execute({
		idOrder: crypto.randomUUID(),
		cpf: "407.302.170-27",
		items: [
			{ idProduct: 1, quantity: 1 },
			{ idProduct: 2, quantity: 1 },
			{ idProduct: 3, quantity: 3 }
		],
		email: "john.doe@gmail.com"
	});
	const idOrder = crypto.randomUUID();
	const input = {
		idOrder,
		cpf: "407.302.170-27",
		items: [
			{ idProduct: 1, quantity: 1 },
			{ idProduct: 2, quantity: 1 },
			{ idProduct: 3, quantity: 3 }
		],
		email: "john.doe@gmail.com",
		date: new Date("2022-01-01T10:00:00"),
		from: "88015600",
		to: "22030060"
	};
	await checkout.execute(input);
	const output = await getOrder.execute(idOrder);
	expect(output.code).toBe("202200000003");
});

afterEach(async () => {
	await connection.close();
});
