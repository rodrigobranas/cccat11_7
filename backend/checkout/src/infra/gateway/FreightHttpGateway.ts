import FreightGateway, { Input, Output } from "../../application/gateway/FreightGateway";
import HttpClient from "../http/HttpClient";

export default class FreightHttpGateway implements FreightGateway {

	constructor (readonly httpClient: HttpClient) {
	}

	async simulateFreight(input: Input): Promise<Output> {
		const output = await this.httpClient.post("http://localhost:3002/simulateFreight", input);
		return output;
	}

}
