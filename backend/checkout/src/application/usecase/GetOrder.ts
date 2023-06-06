import OrderRepository from "../repository/OrderRepository";
import OrderRepositoryDatabase from "../../infra/repository/OrderRepositoryDatabase";
import RepositoryFactory from "../factory/RepositoryFactory";
import GatewayFactory from "../factory/GatewayFactory";
import AuthGateway from "../gateway/AuthGateway";

export default class GetOrder {
	orderRepository: OrderRepository;
	authGateway: AuthGateway;

	constructor (repositoryFactory: RepositoryFactory, gatewayFactory: GatewayFactory) {
		this.orderRepository = repositoryFactory.createOrderRepository();
		this.authGateway = gatewayFactory.createAuthGateway();
	}

	async execute (idOrder: string): Promise<Output> {
		const order = await this.orderRepository.get(idOrder);
		return {
			code: order.code,
			total: order.getTotal()
		};
	}
}

type Output = {
	code: string,
	total: number
}
