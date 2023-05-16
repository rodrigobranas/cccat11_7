import Order from "../entity/Order";

export default interface CheckoutGateway {
	getProducts (): Promise<any>;
	checkout (order: Order): Promise<any>;
}
