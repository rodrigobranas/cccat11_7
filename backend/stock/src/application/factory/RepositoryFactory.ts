import StockEntryRepository from "../repository/StockEntryRepository";

export default interface RepositoryFactory {
	createStockEntryRepository(): StockEntryRepository;
}
