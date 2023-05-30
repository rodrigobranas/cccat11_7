import User from "../../domain/entity/User";

export default interface SignupUserRepository {
	save (user: User): Promise<void>;
}
