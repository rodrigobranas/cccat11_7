import HttpServer from "./HttpServer";
import UsecaseFactory from "../factory/UsecaseFactory";

// interface adapter
export default class HttpController {

	constructor (httpServer: HttpServer, usecaseFactory: UsecaseFactory) {
		httpServer.on("post", "/checkout", async function (params: any, body: any) {
			const checkout = usecaseFactory.createCheckout();
			const output = await checkout.execute(body);
			return output;
		});

	}
}
