import Checkout from "../../application/usecase/Checkout";
import RepositoryFactory from "../../application/factory/RepositoryFactory";
import GatewayFactory from "../../application/factory/GatewayFactory";
import GetOrder from "../../application/usecase/GetOrder";
import AuthDecorator from "../../application/decorator/AuthDecorator";
import LogDecorator from "../../application/decorator/LogDecorator";
import Queue from "../queue/Queue";

export default class UsecaseFactory {

	constructor (readonly repositoryFactory: RepositoryFactory, readonly gatewayFactory: GatewayFactory, readonly queue: Queue) {
	}

	createCheckout () {
		return new LogDecorator(new AuthDecorator(new Checkout(this.repositoryFactory, this.gatewayFactory, this.queue), this.gatewayFactory), this.gatewayFactory);
	}

	createGetOrder () {
		return new GetOrder(this.repositoryFactory, this.gatewayFactory);
	}

}
