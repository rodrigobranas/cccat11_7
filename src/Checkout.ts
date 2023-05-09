import { validate } from "./validateCpf";
import ProductRepository from "./ProductRepository";
import CouponRepository from "./CouponRepository";
import ProductRepositoryDatabase from "./ProductRepositoryDatabase";
import CouponRepositoryDatabase from "./CouponRepositoryDatabase";
import OrderRepository from "./OrderRepository";
import OrderRepositoryDatabase from "./OrderRepositoryDatabase";
import FreightCalculator from "./FreightCalculator";
import Order from "./Order";

export default class Checkout {

	constructor (
		readonly productRepository: ProductRepository = new ProductRepositoryDatabase(),
		readonly couponRepository: CouponRepository = new CouponRepositoryDatabase(),
		readonly orderRepository: OrderRepository = new OrderRepositoryDatabase()
	) {
	}

	async execute (input: Input): Promise<Output> {
		const sequence = await this.orderRepository.count();
		const order = new Order(input.idOrder, input.cpf, input.date, sequence + 1);
		for (const item of input.items) {
			const product = await this.productRepository.get(item.idProduct);
			order.addItem(product, item.quantity);
			if (input.from && input.to) {
				order.freight += FreightCalculator.calculate(product) * item.quantity;
			}
		}
		if (input.coupon) {
			const coupon = await this.couponRepository.get(input.coupon);
			if (coupon) {
				order.addCoupon(coupon);
			}
		}
		await this.orderRepository.save(order);
		return {
			freight: order.freight,
			total: order.getTotal()
		};
	}
}

type Input = {
	idOrder?: string,
	cpf: string, 
	email?: string,
	items: { idProduct: number, quantity: number }[], 
	date?: Date,
	coupon?: string, 
	from?: string, 
	to?: string 
}

type Output = {
	freight: number,
	total: number
}
