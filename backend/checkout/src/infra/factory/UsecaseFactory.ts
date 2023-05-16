import Checkout from "../../application/usecase/Checkout";
import CsvPresenter from "../presenter/CsvPresenter";
import GetProducts from "../../application/usecase/GetProducts";
import JsonPresenter from "../presenter/JsonPresenter";
import Presenter from "../presenter/Presenter";
import RepositoryFactory from "../../application/factory/RepositoryFactory";

export default class UsecaseFactory {

	constructor (readonly repositoryFactory: RepositoryFactory) {
	}

	createCheckout () {
		return new Checkout(this.repositoryFactory);
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