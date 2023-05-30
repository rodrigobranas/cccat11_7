import RepositoryFactory from "../../application/factory/RepositoryFactory";
import ZipcodeRepository from "../../application/repository/ZipcodeRepository";
import DatabaseConnection from "../database/DatabaseConnection";
import ZipcodeRepositoryDatabase from "../repository/ZipcodeRepositoryDatabase";

export default class DatabaseRepositoryFactory implements RepositoryFactory {
	
	constructor (readonly connection: DatabaseConnection) {
	}

	createZipcodeRepository(): ZipcodeRepository {
		return new ZipcodeRepositoryDatabase(this.connection);
	}

}
