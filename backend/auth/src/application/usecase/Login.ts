import UserRepository from "../repository/UserRepository";
import TokenGenerator from "../../domain/entity/TokenGenerator";


export default class Login {

	constructor (readonly userRepository: UserRepository) {
	}

	async execute (input: Input): Promise<Output> {
		const user = await this.userRepository.get(input.email);
		if (user.validatePassword(input.password)) {
			const tokenGenerator = new TokenGenerator("secret");
			return {
				token: tokenGenerator.sign(user, input.date)
			};
		} else {
			throw new Error("Authentication failed");
		}
	}

}

type Input = {
	email: string,
	password: string,
	date: Date
}

type Output = {
	token: string
}
