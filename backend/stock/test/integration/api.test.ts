import axios from "axios";

axios.defaults.validateStatus = function () {
	return true;
}

test("Deve calcular o frete", async function () {
	await axios.post("http://localhost:3005/cleanStock", { idProduct: 1 });
	const input = {
		items: [
			{ idProduct: 1, quantity: 1 }
		]
	};
	await axios.post("http://localhost:3005/decreaseStock", input);
	const response = await axios.post("http://localhost:3005/getStock", { idProduct: 1 });
	const total = response.data;
	expect(total).toBe(-1);
});