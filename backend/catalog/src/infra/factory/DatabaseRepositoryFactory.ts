import DatabaseConnection from "../database/DatabaseConnection";
import ProductRepository from "../../application/repository/ProductRepository";
import ProductRepositoryDatabase from "../repository/ProductRepositoryDatabase";
import RepositoryFactory from "../../application/factory/RepositoryFactory";

export default class DatabaseRepositoryFactory implements RepositoryFactory {
	
	constructor (readonly connection: DatabaseConnection) {
	}

	createProductRepository(): ProductRepository {
		return new ProductRepositoryDatabase(this.connection);
	}

}