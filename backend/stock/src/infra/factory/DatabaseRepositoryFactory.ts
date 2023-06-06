import RepositoryFactory from "../../application/factory/RepositoryFactory";
import StockEntryRepository from "../../application/repository/StockEntryRepository";
import DatabaseConnection from "../database/DatabaseConnection";
import StockEntryRepositoryDatabase from "../repository/StockEntryRepositoryDatabase";

export default class DatabaseRepositoryFactory implements RepositoryFactory {
	
	constructor (readonly connection: DatabaseConnection) {
	}

	createStockEntryRepository(): StockEntryRepository {
		return new StockEntryRepositoryDatabase(this.connection);
	}

}
