import StockEntry from "../../domain/entity/StockEntry";
import RepositoryFactory from "../factory/RepositoryFactory";
import StockEntryRepository from "../repository/StockEntryRepository";
import ZipcodeRepository from "../repository/StockEntryRepository";

// Use Case - Application Service
export default class DecreaseStock {
	stockEntryRepository: StockEntryRepository;

	constructor (repositoryFactory: RepositoryFactory) {
		this.stockEntryRepository = repositoryFactory.createStockEntryRepository();
	}

	async execute (input: Input): Promise<void> {
		console.log("decreaseStock", input);
		for (const item of input.items) {
			const stockEntry = new StockEntry(item.idProduct, "out", item.quantity);
			await this.stockEntryRepository.saveStockEntry(stockEntry);
		}
	}
}

type Input = {
	items: { idProduct: number, quantity: number }[]
}
