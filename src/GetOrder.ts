import OrderRepository from "./OrderRepository";
import OrderRepositoryDatabase from "./OrderRepositoryDatabase";

export default class GetOrder {

	constructor (readonly orderRepository: OrderRepository = new OrderRepositoryDatabase()) {
	}

	async execute (idOrder: string): Promise<Output> {
		const orderData = await this.orderRepository.get(idOrder);
		orderData.total = parseFloat(orderData.total);
		orderData.freight = parseFloat(orderData.freight);
		return orderData;
	}
}

type Output = {
	code: string,
	total: number
}
