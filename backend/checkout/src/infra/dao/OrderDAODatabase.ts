import OrderDAO from "../../application/dao/OrderDAO";
import DatabaseConnection from "../database/DatabaseConnection";

export default class OrderDAODatabase implements OrderDAO {

	constructor (readonly connection: DatabaseConnection) {
	}

	async list(): Promise<any> {
		return this.connection.query("select * from cccat11.item join cccat11.product using (id_product)", []);
	}

}