import Cpf from "../../src/domain/entity/Cpf";

test.each([
	"407.302.170-27",
	"684.053.160-00",
	"746.971.314-01"
])("Deve criar um cpf válido", function (cpf: string) {
	expect(new Cpf(cpf)).toBeDefined();
});

test.each([
	"406.302.170-27",
	"406.302.170",
	"406.302",
	"111.111.111-11",
	"222.222.222-22",
	"333.333.333-33"
])("Não deve criar um cpf inválido", function (cpf: string) {
	expect(() => new Cpf(cpf)).toThrow(new Error("Invalid cpf"));
});
