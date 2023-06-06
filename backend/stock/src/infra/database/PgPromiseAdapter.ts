import DatabaseConnection from "./DatabaseConnection";
import pgp from "pg-promise";

// Framework and Driver
// Adapter
export default class PgPromiseAdapter implements DatabaseConnection {
	connection: any;

	async connect(): Promise<void> {
		this.connection = pgp()("postgres://postgres:123456@localhost:5432/app");
	}

	async query(statement: string, params: any): Promise<any> {
		return this.connection.query(statement, params);
	}

	async close(): Promise<void> {
		await this.connection.$pool.end();
	}

}
