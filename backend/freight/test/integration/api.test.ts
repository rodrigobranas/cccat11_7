import axios from "axios";

axios.defaults.validateStatus = function () {
	return true;
}

test("Deve calcular o frete", async function () {
	const input = {
		items: [
			{ volume: 0.03, density: 100, quantity: 1 }
		],
		from: "88015600",
		to: "22060030"
	};
	const response = await axios.post("http://localhost:3002/simulateFreight", input);
	const output = response.data;
	expect(output.freight).toBe(22.446653340244893);
});