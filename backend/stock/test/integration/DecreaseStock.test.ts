import DatabaseRepositoryFactory from "../../src/infra/factory/DatabaseRepositoryFactory";
import PgPromiseAdapter from "../../src/infra/database/PgPromiseAdapter";
import DecreaseStock from "../../src/application/usecase/DecreaseStock";
import CleanStock from "../../src/application/usecase/CleanStock";
import GetStock from "../../src/application/usecase/GetStock";

test("Deve reduzir o estoque", async function () {
	const connection = new PgPromiseAdapter();
	await connection.connect();
	const repositoryFactory = new DatabaseRepositoryFactory(connection);
	const cleanStock = new CleanStock(repositoryFactory);
	await cleanStock.execute(1);
	await cleanStock.execute(2);
	await cleanStock.execute(3);
	const decreaseStock = new DecreaseStock(repositoryFactory);
	const input = {
		items: [
			{ idProduct: 1, quantity: 1 },
			{ idProduct: 2, quantity: 1 },
			{ idProduct: 3, quantity: 3 }
		]
	}
	await decreaseStock.execute(input);
	const getStock = new GetStock(repositoryFactory);
	const total1 = await getStock.execute(1);
	expect(total1).toBe(-1);
	const total2 = await getStock.execute(2);
	expect(total2).toBe(-1);
	const total3 = await getStock.execute(3);
	expect(total3).toBe(-3);
	await connection.close();
});
