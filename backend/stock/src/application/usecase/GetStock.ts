import StockCalculator from "../../domain/entity/StockCalculator";
import StockEntry from "../../domain/entity/StockEntry";
import RepositoryFactory from "../factory/RepositoryFactory";
import StockEntryRepository from "../repository/StockEntryRepository";
import ZipcodeRepository from "../repository/StockEntryRepository";

// Use Case - Application Service
export default class GetStock {
	stockEntryRepository: StockEntryRepository;

	constructor (repositoryFactory: RepositoryFactory) {
		this.stockEntryRepository = repositoryFactory.createStockEntryRepository();
	}

	async execute (idProduct: number): Promise<number> {
		const stockEntries = await this.stockEntryRepository.getStockEntries(idProduct);
		const total = StockCalculator.calculate(stockEntries);
		return total;
	}
}
