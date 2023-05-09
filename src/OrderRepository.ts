import Order from "./Order";

// boundary
export default interface OrderRepository {
	get (uuid: string): Promise<any>;
	save (order: Order): Promise<void>;
	clear (): Promise<void>;
	count(): Promise<number>;
}
