import RepositoryFactory from "../../application/factory/RepositoryFactory";
import SimulateFreight from "../../application/usecase/SimulateFreight";

export default class UsecaseFactory {

	constructor (readonly repositoryFactory: RepositoryFactory) {
	}

	createSimulateFreight () {
		return new SimulateFreight(this.repositoryFactory);
	}

}