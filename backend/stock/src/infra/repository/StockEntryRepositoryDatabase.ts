import StockEntryRepository from "../../application/repository/StockEntryRepository";
import ZipcodeRepository from "../../application/repository/StockEntryRepository";
import StockEntry from "../../domain/entity/StockEntry";
import DatabaseConnection from "../database/DatabaseConnection";

export default class StockEntryRepositoryDatabase implements StockEntryRepository {

	constructor (readonly connection: DatabaseConnection) {
	}
	
	async getStockEntries(idProduct: number): Promise<StockEntry[]> {
		const stockEntriesData = await this.connection.query("select * from cccat11.stock_entry where id_product = $1", [idProduct]);
		const stockEntries = [];
		for (const stockEntryData of stockEntriesData) {
			stockEntries.push(new StockEntry(stockEntryData.id_product, stockEntryData.operation, stockEntryData.quantity));
		}
		return stockEntries;
	}
	
	async saveStockEntry(stockEntry: StockEntry): Promise<void> {
		await this.connection.query("insert into cccat11.stock_entry (id_product, operation, quantity) values ($1, $2, $3)", [stockEntry.idProduct, stockEntry.operation, stockEntry.quantity]);
	}

	async clean(idProduct: number): Promise<void> {
		await this.connection.query("delete from cccat11.stock_entry", []);
	}

}
