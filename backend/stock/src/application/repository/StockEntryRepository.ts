import StockEntry from "../../domain/entity/StockEntry";

export default interface StockEntryRepository {
	getStockEntries (idProduct: number): Promise<StockEntry[]>;
	saveStockEntry (stockEntry: StockEntry): Promise<void>;
	clean (idProduct: number): Promise<void>;
}
