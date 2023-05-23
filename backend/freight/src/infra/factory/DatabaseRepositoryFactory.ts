import RepositoryFactory from "../../application/factory/RepositoryFactory";
import DatabaseConnection from "../database/DatabaseConnection";

export default class DatabaseRepositoryFactory implements RepositoryFactory {
	
	constructor (readonly connection: DatabaseConnection) {
	}

}
