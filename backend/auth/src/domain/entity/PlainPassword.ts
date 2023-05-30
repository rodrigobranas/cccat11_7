import { pbkdf2Sync, createHash, randomBytes } from "crypto";
import Password from "./Password";

export default class PlainPassword implements Password {

	private constructor (readonly value: string, readonly salt: string) {
	}
	
	// static factory method
	static create (password: string) {
		return new PlainPassword(password, "");
	}

	// static factory method
	static restore (password: string, salt: string) {
		return new PlainPassword(password, salt);
	}

	validate (password: string) {
		return password === this.value;
	}
}
