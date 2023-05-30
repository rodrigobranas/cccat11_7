import { pbkdf2Sync, randomBytes } from "crypto";
import Password from "./Password";

export default class PBKDF2Password implements Password {

	private constructor (readonly value: string, readonly salt: string) {
	}
	
	// static factory method
	static create (password: string) {
		const salt = randomBytes(20).toString("hex");
		const value = pbkdf2Sync(password, salt, 64, 100, "sha512").toString("hex");
		return new PBKDF2Password(value, salt);
	}

	// static factory method
	static restore (password: string, salt: string) {
		return new PBKDF2Password(password, salt);
	}

	validate (password: string) {
		const value = pbkdf2Sync(password, this.salt, 64, 100, "sha512").toString("hex");
		return value === this.value;
	}
}
