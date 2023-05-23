import DatabaseRepositoryFactory from "../../src/infra/factory/DatabaseRepositoryFactory";
import PgPromiseAdapter from "../../src/infra/database/PgPromiseAdapter";
import SimulateFreight from "../../src/application/usecase/SimulateFreight";

test("Deve simular o frete", async function () {
	const input = {
		items: [
			{ volume: 0.03, density: 100, quantity: 1 }
		],
		from: "88015600",
		to: "22030060"
	}
	const connection = new PgPromiseAdapter();
	await connection.connect();
	const repositoryFactory = new DatabaseRepositoryFactory(connection);
	const simulateFreight = new SimulateFreight(repositoryFactory);
	const output = await simulateFreight.execute(input);
	expect(output.freight).toBe(30);
	await connection.close();
});
