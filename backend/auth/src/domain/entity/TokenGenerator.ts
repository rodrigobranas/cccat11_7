import { sign, verify } from "jsonwebtoken";
import User from "./User";

// Domain Service
export default class TokenGenerator {
	EXPIRES_IN = 1000000;

	constructor (readonly key: string) {
	}

	sign (user: User, date: Date) {
		return sign({ email: user.email.value, iat: date.getTime(), expiresIn: this.EXPIRES_IN}, this.key);
	}

	verify (token: string): any {
		return verify(token, this.key);
	}
}