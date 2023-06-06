import StockCalculator from "../../domain/entity/StockCalculator";
import StockEntry from "../../domain/entity/StockEntry";
import RepositoryFactory from "../factory/RepositoryFactory";
import StockEntryRepository from "../repository/StockEntryRepository";
import ZipcodeRepository from "../repository/StockEntryRepository";

// Use Case - Application Service
export default class CleanStock {
	stockEntryRepository: StockEntryRepository;

	constructor (repositoryFactory: RepositoryFactory) {
		this.stockEntryRepository = repositoryFactory.createStockEntryRepository();
	}

	async execute (idProduct: number): Promise<void> {
		await this.stockEntryRepository.clean(idProduct);
	}
}
