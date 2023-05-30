import Checkout from "../../application/usecase/Checkout";
import RepositoryFactory from "../../application/factory/RepositoryFactory";
import GatewayFactory from "../../application/factory/GatewayFactory";

export default class UsecaseFactory {

	constructor (readonly repositoryFactory: RepositoryFactory, readonly gatewayFactory: GatewayFactory) {
	}

	createCheckout () {
		return new Checkout(this.repositoryFactory, this.gatewayFactory);
	}

}