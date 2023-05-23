import CsvPresenter from "../presenter/CsvPresenter";
import GetProducts from "../../application/usecase/GetProducts";
import JsonPresenter from "../presenter/JsonPresenter";
import Presenter from "../presenter/Presenter";
import RepositoryFactory from "../../application/factory/RepositoryFactory";
import GetProduct from "../../application/usecase/GetProduct";

export default class UsecaseFactory {

	constructor (readonly repositoryFactory: RepositoryFactory) {
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

	createGetProduct () {
		return new GetProduct(this.repositoryFactory);
	}

}
