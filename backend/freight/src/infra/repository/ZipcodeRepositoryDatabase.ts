import ZipcodeRepository from "../../application/repository/ZipcodeRepository";
import Zipcode from "../../domain/entity/Zipcode";
import DatabaseConnection from "../database/DatabaseConnection";

export default class ZipcodeRepositoryDatabase implements ZipcodeRepository {

	constructor (readonly connection: DatabaseConnection) {
	}

	async get(code: string): Promise<Zipcode | undefined> {
		const [zipcodeData] = await this.connection.query("select * from cccat11.zipcode where code = $1", [code]);
		if (!zipcodeData) return;
		return new Zipcode(zipcodeData.code, parseFloat(zipcodeData.lat), parseFloat(zipcodeData.long));
	}

}