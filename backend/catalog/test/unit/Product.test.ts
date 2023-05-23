import Product from "../../src/domain/entity/Product";

test("Deve calcular o volume", function () {
	const product = new Product(1, "A", 1000, 100, 30, 10, 3);
	expect(product.getVolume()).toBe(0.03);
});

test("Deve calcular a densidade", function () {
	const product = new Product(1, "A", 1000, 100, 30, 10, 3);
	expect(product.getDensity()).toBe(100);
});

test("Não deve criar produto com dimensões inválidas", function () {
	expect(() => new Product(1, "A", 1000, -100, -100, -100, 10)).toThrow(new Error("Invalid dimensions"));
});

test("Não deve criar produto com peso inválido", function () {
	expect(() => new Product(1, "A", 1000, 100, 100, 100, -10)).toThrow(new Error("Invalid weight"));
});
