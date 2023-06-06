import UserRepository from "../repository/UserRepository";
import TokenGenerator from "../../domain/entity/TokenGenerator";


export default class Verify {

	constructor () {
	}

	async execute (token: string): Promise<Output> {
		const tokenGenerator = new TokenGenerator("secret");
		const output = tokenGenerator.verify(token);
		return {
			email: output.email
		}
	}

}

type Output = {
	email: string
}
