import axios from "axios";

axios.defaults.validateStatus = function () {
	return true;
}

test("Deve verificar um token", async function () {
	const input = {
		token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImpvYW9AZ21haWwuY29tIiwiaWF0IjoxNjQ2MTM5NjAwMDAwLCJleHBpcmVzSW4iOjEwMDAwMDB9.aHf1geyFbypi_-xreacJmHo8Fhh7c2hBdok_KCkEsG4"
	}
	const response = await axios.post("http://localhost:3004/verify", input);
	const output = response.data;
	expect(output.email).toBe("joao@gmail.com");
});
