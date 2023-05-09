import ProductRepositoryDatabase from "../src/ProductRepositoryDatabase";

test("Deve obter um produto do banco de dados", async function () {
	const productRepository = new ProductRepositoryDatabase();
	const productData = await productRepository.get(1);
	expect(productData.price).toBe(1000);
});
