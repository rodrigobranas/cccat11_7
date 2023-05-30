import HttpServer from "./HttpServer";
import UsecaseFactory from "../factory/UsecaseFactory";

// interface adapter
export default class HttpController {

	constructor (httpServer: HttpServer, usecaseFactory: UsecaseFactory) {

		// httpServer.on("get", "/products", async function (params: any, body: any, headers: any) {
		// 	const contentType = headers["content-type"] || "application/json";
		// 	const getProducts = usecaseFactory.createGetProducts(contentType);
		// 	const output = await getProducts.execute();
		// 	return output;
		// });

	}
}
