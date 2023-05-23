import HttpServer from "./HttpServer";
import UsecaseFactory from "../factory/UsecaseFactory";

// interface adapter
export default class HttpController {

	constructor (httpServer: HttpServer, usecaseFactory: UsecaseFactory) {
		httpServer.on("post", "/simulateFreight", async function (params: any, body: any) {
			const simulateFreight = usecaseFactory.createSimulateFreight();
			const output = await simulateFreight.execute(body);
			return output;
		});
	}
}
