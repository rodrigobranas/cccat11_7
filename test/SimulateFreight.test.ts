import ProductRepositoryDatabase from "../src/ProductRepositoryDatabase";
import SimulateFreight from "../src/SimulateFreight";

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
	const productRepository = new ProductRepositoryDatabase();
	const simulateFreight = new SimulateFreight(productRepository);
	const output = await simulateFreight.execute(input);
	expect(output.freight).toBe(280);
});
