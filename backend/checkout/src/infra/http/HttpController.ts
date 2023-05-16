import Checkout from "../../application/usecase/Checkout";
import CsvPresenter from "../presenter/CsvPresenter";
import HttpServer from "./HttpServer";
import JsonPresenter from "../presenter/JsonPresenter";
import UsecaseFactory from "../factory/UsecaseFactory";

// interface adapter
export default class HttpController {

	constructor (httpServer: HttpServer, usecaseFactory: UsecaseFactory) {
		httpServer.on("post", "/checkout", async function (params: any, body: any) {
			console.log(body);
			const checkout = usecaseFactory.createCheckout();
			const output = await checkout.execute(body);
			console.log(output);
			return output;
		});

		httpServer.on("get", "/products", async function (params: any, body: any, headers: any) {
			const contentType = headers["content-type"] || "application/json";
			const getProducts = usecaseFactory.createGetProducts(contentType);
			const output = await getProducts.execute();
			return output;
		});
	}
}
