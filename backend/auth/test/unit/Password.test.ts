import MD5Password from "../../src/domain/entity/MD5Password";
import PBKDF2Password from "../../src/domain/entity/PBKDF2Password";
import PlainPassword from "../../src/domain/entity/PlainPassword";
import SHA1Password from "../../src/domain/entity/SHA1Password";

test("Deve criar uma senha usando pbkdf2", function () {
	const password = PBKDF2Password.create("abc123");
	expect(password.validate("abc123")).toBe(true);
});

test("Deve criar uma senha usando plain text", function () {
	const password = PlainPassword.create("abc123");
	expect(password.validate("abc123")).toBe(true);
});

test("Deve criar uma senha usando md5", function () {
	const password = MD5Password.create("abc123");
	expect(password.validate("abc123")).toBe(true);
});

test("Deve criar uma senha usando sha1", function () {
	const password = SHA1Password.create("abc123");
	expect(password.validate("abc123")).toBe(true);
});
