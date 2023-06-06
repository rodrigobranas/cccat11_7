import HttpServer from "./HttpServer";
import UsecaseFactory from "../factory/UsecaseFactory";
import Queue from "../queue/Queue";

// interface adapter
export default class HttpController {

	constructor (httpServer: HttpServer, usecaseFactory: UsecaseFactory, queue: Queue) {
		httpServer.on("post", "/checkout", async function (params: any, body: any, headers: any) {
			body.token = headers.token;
			const checkout = usecaseFactory.createCheckout();
			const output = await checkout.execute(body);
			return output;
		});

		httpServer.on("post", "/checkoutAsync", async function (params: any, body: any, headers: any) {
			// command
			await queue.publish("checkout", body);
		});

		httpServer.on("get", "/orders/:idOrder", async function (params: any, body: any) {
			const getOrder = usecaseFactory.createGetOrder();
			const output = await getOrder.execute(params.idOrder);
			return output;
		});

	}
}
