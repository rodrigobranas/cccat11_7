import Checkout from "../../application/usecase/Checkout";
import CsvPresenter from "../presenter/CsvPresenter";
import GetProducts from "../../application/usecase/GetProducts";
import JsonPresenter from "../presenter/JsonPresenter";
import Presenter from "../presenter/Presenter";
import RepositoryFactory from "../../application/factory/RepositoryFactory";
import GatewayFactory from "../../application/factory/GatewayFactory";

export default class UsecaseFactory {

	constructor (readonly repositoryFactory: RepositoryFactory, readonly gatewayFactory: GatewayFactory) {
	}

	createCheckout () {
		return new Checkout(this.repositoryFactory, this.gatewayFactory);
	}

	createGetProducts (type: string) {
		let presenter;
		if (type === "application/json") {
			presenter = new JsonPresenter();
		}
		if (type === "text/csv") {
			presenter = new CsvPresenter();
		}
		if (!presenter) throw new Error("Invalid type");
		return new GetProducts(this.repositoryFactory, presenter);
	}

}