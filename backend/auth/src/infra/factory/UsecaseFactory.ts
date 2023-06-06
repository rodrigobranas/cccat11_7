import RepositoryFactory from "../../application/factory/RepositoryFactory";
import Verify from "../../application/usecase/Verify";

export default class UsecaseFactory {

	constructor (readonly repositoryFactory: RepositoryFactory) {
	}

	createVerify () {
		return new Verify();
	}

}
