import RepositoryFactory from "../../application/factory/RepositoryFactory";
import CleanStock from "../../application/usecase/CleanStock";
import DecreaseStock from "../../application/usecase/DecreaseStock";
import GetStock from "../../application/usecase/GetStock";

export default class UsecaseFactory {

	constructor (readonly repositoryFactory: RepositoryFactory) {
	}

	createDecreaseStock () {
		return new DecreaseStock(this.repositoryFactory);
	}

	createGetStock () {
		return new GetStock(this.repositoryFactory);
	}

	createCleanStock () {
		return new CleanStock(this.repositoryFactory);
	}

}
