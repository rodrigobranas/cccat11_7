import TokenGenerator from "../../src/domain/entity/TokenGenerator";
import User from "../../src/domain/entity/User";

test("Deve assinar um token", function () {
	const tokenGenerator = new TokenGenerator("secret");
	const user = User.create("joao@gmail.com", "abc123", "pbkdf2");
	const token = tokenGenerator.sign(user, new Date("2023-03-01T10:00:00"));
	expect(token).toBe("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImpvYW9AZ21haWwuY29tIiwiaWF0IjoxNjc3Njc1NjAwMDAwLCJleHBpcmVzSW4iOjEwMDAwMDB9.UkLW3l3gaIW7U0JGpZnDUZTbE_fHtDLd-eI9yV0_C8s");
});

test("Deve verificar um token", function () {
	const tokenGenerator = new TokenGenerator("secret");
	const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImpvYW9AZ21haWwuY29tIiwiaWF0IjoxNjc3Njc1NjAwMDAwLCJleHBpcmVzSW4iOjEwMDAwMDB9.UkLW3l3gaIW7U0JGpZnDUZTbE_fHtDLd-eI9yV0_C8s";
	const output = tokenGenerator.verify(token);
	expect(output.email).toBe("joao@gmail.com");
});
