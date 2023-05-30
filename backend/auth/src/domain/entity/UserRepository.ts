import User from "../../domain/entity/User";

export default interface UserRepository {
	save (user: User): Promise<void>;
	get (email: string): Promise<User>;
	delete (email: string): Promise<void>;
	update (user: User): Promise<void>;
}
