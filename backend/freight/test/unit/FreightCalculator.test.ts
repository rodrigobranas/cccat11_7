import FreightCalculator from "../../src/domain/entity/FreightCalculator";

test("Deve calcular o frete", function () {
	const freight = FreightCalculator.calculate(1000, 0.03, 100);
	expect(freight).toBe(30);
});

test("Deve calcular o frete com frete mínimo", function () {
	const freight = FreightCalculator.calculate(1000, 0.01, 100);
	expect(freight).toBe(10);
});
