import OrderRepository from "../repository/OrderRepository";
import OrderRepositoryDatabase from "../../infra/repository/OrderRepositoryDatabase";
import RepositoryFactory from "../factory/RepositoryFactory";
import GatewayFactory from "../factory/GatewayFactory";
import AuthGateway from "../gateway/AuthGateway";
import CatalogGateway from "../gateway/CatalogGateway";
import OrderDAO from "../dao/OrderDAO";

export default class GetOrders {

	constructor (readonly orderDAO: OrderDAO) {
	}

	async execute (): Promise<Output[]> {
		const ordersData = await this.orderDAO.list();
		return ordersData;
	}
}

type Output = {
	idOrder: string,
	items: { description: string, price: number, quantity: number }[],
	date: Date
};
