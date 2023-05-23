import CsvPresenter from "../presenter/CsvPresenter";
import HttpServer from "./HttpServer";
import JsonPresenter from "../presenter/JsonPresenter";
import UsecaseFactory from "../factory/UsecaseFactory";

// interface adapter
export default class HttpController {

	constructor (httpServer: HttpServer, usecaseFactory: UsecaseFactory) {

		httpServer.on("get", "/products", async function (params: any, body: any, headers: any) {
			const contentType = headers["content-type"] || "application/json";
			const getProducts = usecaseFactory.createGetProducts(contentType);
			const output = await getProducts.execute();
			return output;
		});

		httpServer.on("get", "/products/:idProduct", async function (params: any, body: any, headers: any) {
			const getProduct = usecaseFactory.createGetProduct();
			const output = await getProduct.execute(params.idProduct);
			return output;
		});
	}
}
