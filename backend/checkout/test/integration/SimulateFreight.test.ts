import DatabaseRepositoryFactory from "../../src/infra/factory/DatabaseRepositoryFactory";
import PgPromiseAdapter from "../../src/infra/database/PgPromiseAdapter";
import ProductRepositoryDatabase from "../../src/infra/repository/ProductRepositoryDatabase";
import SimulateFreight from "../../src/application/usecase/SimulateFreight";

test("Deve simular o frete", async function () {
	const input = {
		items: [
			{ idProduct: 1, quantity: 1 },
			{ idProduct: 2, quantity: 1 },
			{ idProduct: 3, quantity: 3 }
		],
		from: "88015600",
		to: "22030060"
	}
	const connection = new PgPromiseAdapter();
	await connection.connect();
	const repositoryFactory = new DatabaseRepositoryFactory(connection);
	const simulateFreight = new SimulateFreight(repositoryFactory);
	const output = await simulateFreight.execute(input);
	expect(output.freight).toBe(280);
	await connection.close();
});
