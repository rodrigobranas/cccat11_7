import PgPromiseAdapter from "../../src/infra/database/PgPromiseAdapter";
import ProductRepositoryDatabase from "../../src/infra/repository/ProductRepositoryDatabase";

test("Deve obter um produto do banco de dados", async function () {
	const connection = new PgPromiseAdapter();
	await connection.connect();
	const productRepository = new ProductRepositoryDatabase(connection);
	const productData = await productRepository.get(1);
	expect(productData.price).toBe(1000);
	await connection.close();
});
