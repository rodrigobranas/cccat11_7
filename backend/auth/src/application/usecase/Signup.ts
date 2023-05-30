import UserRepository from "../repository/UserRepository";
import User from "../../domain/entity/User";
import SignupUserRepository from "../repository/SignupUserRepository";
import UserRepositoryDatabase from "../../infra/repository/UserRepositoryDatabase";

export default class Signup {

	constructor (readonly userRepository: UserRepository) {
	}

	async execute (input: Input): Promise<void> {
		const user = User.create(input.email, input.password, "pbkdf2");
		await this.userRepository.save(user);
	}

}

type Input = {
	email: string,
	password: string
}
