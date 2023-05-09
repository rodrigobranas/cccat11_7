import Cpf from "../src/Cpf";

test("Deve criar um cpf válido", function () {
	const cpf = new Cpf("407.302.170-27");
	expect(cpf).toBeDefined();
});

test("Não deve criar um cpf inválido", function () {
	expect(() => new Cpf("407.302.170-26")).toThrow(new Error("Invalid cpf"));
});
