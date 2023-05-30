import MD5Password from "./MD5Password";
import PBKDF2Password from "./PBKDF2Password";
import PlainPassword from "./PlainPassword";
import SHA1Password from "./SHA1Password";

export default class PasswordFactory {
	static create (type: string, password: string) {
		if (type === "plain") {
			return PlainPassword.create(password);
		}
		if (type === "pbkdf2") {
			return PBKDF2Password.create(password);
		}
		if (type === "md5") {
			return MD5Password.create(password);
		}
		if (type === "sha1") {
			return SHA1Password.create(password);
		}
		throw new Error("Invalid type");
	}

	static restore (type: string, password: string, salt: string) {
		if (type === "plain") {
			return PlainPassword.restore(password, salt);
		}
		if (type === "pbkdf2") {
			return PBKDF2Password.restore(password, salt);
		}
		if (type === "md5") {
			return MD5Password.restore(password, salt);
		}
		if (type === "sha1") {
			return SHA1Password.restore(password, salt);
		}
		throw new Error("Invalid type");
	}
}
