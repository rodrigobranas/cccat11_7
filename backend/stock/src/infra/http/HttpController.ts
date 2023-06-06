import HttpServer from "./HttpServer";
import UsecaseFactory from "../factory/UsecaseFactory";

// interface adapter
export default class HttpController {

	constructor (httpServer: HttpServer, usecaseFactory: UsecaseFactory) {
		httpServer.on("post", "/decreaseStock", async function (params: any, body: any) {
			const decreaseStock = usecaseFactory.createDecreaseStock();
			await decreaseStock.execute(body);
		});

		httpServer.on("post", "/getStock", async function (params: any, body: any) {
			const getStock = usecaseFactory.createGetStock();
			const output = await getStock.execute(body.idProduct);
			return output;
		});

		httpServer.on("post", "/cleanStock", async function (params: any, body: any) {
			const cleanStock = usecaseFactory.createCleanStock();
			await cleanStock.execute(body.idProduct);
		});
	}
}
