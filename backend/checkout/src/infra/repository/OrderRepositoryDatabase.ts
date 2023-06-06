import DatabaseConnection from "../database/DatabaseConnection";
import Order from "../../domain/entity/Order";
import OrderRepository from "../../application/repository/OrderRepository";
import Item from "../../domain/entity/Item";

// Repository sempre retorna Aggregates os informações associadas ao Aggregate
export default class OrderRepositoryDatabase implements OrderRepository {

	constructor (readonly connection: DatabaseConnection) {
	}

	async list(): Promise<Order[]> {
		const orders: Order[] = [];
		const ordersData = await this.connection.query("select * from cccat11.order", []);
		for (const orderData of ordersData) {
			const order = new Order(orderData.id_order, orderData.cpf, orderData.date, orderData.sequence);
			const itemsData = await this.connection.query("select * from cccat11.item where id_order = $1", [order.idOrder]);
			for (const itemData of itemsData) {
				const item = new Item(itemData.id_product, parseFloat(itemData.price), itemData.quantity);
				order.items.push(item);
			}
			orders.push(order);
		}
		return orders;
	}

	async get(idOrder: string): Promise<Order> {
		const [orderData] = await this.connection.query("select * from cccat11.order where id_order = $1", [idOrder]);
		const order = new Order(orderData.id_order, orderData.cpf, orderData.date, orderData.sequence);
		const itemsData = await this.connection.query("select * from cccat11.item where id_order = $1", [idOrder]);
		for (const itemData of itemsData) {
			const item = new Item(itemData.id_product, parseFloat(itemData.price), itemData.quantity);
			order.items.push(item);
		}
		return order;
	}

	async save(order: Order): Promise<void> {
		await this.connection.query("insert into cccat11.order (id_order, code, cpf, total, freight, date, sequence) values ($1, $2, $3, $4, $5, $6, $7)", [order.idOrder, order.code, order.cpf.value, order.getTotal(), order.freight, order.date, order.sequence]);
		for (const item of order.items) {
			await this.connection.query("insert into cccat11.item (id_order, id_product, price, quantity) values ($1, $2, $3, $4)", [order.idOrder, item.idProduct, item.price, item.quantity]);
		}
	}

	async clear(): Promise<void> {
		await this.connection.query("delete from cccat11.order", []);
	}

	async count(): Promise<number> {
		const [data] = await this.connection.query("select count(*)::integer from cccat11.order", []);
		return data.count;
	}

}
