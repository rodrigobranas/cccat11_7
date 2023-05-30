import OrderRepository from "../repository/OrderRepository";
import OrderRepositoryDatabase from "../../infra/repository/OrderRepositoryDatabase";
import RepositoryFactory from "../factory/RepositoryFactory";

export default class GetOrder {
	orderRepository: OrderRepository;

	constructor (repositoryFactory: RepositoryFactory) {
		this.orderRepository = repositoryFactory.createOrderRepository();
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
