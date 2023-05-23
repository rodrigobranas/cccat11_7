import Coupon from "./Coupon";
import Cpf from "./Cpf";
import Item from "./Item";
import OrderCode from "./OrderCode";
import Product from "./Product";

// Entity - Aggregate Root
export default class Order {
	cpf: Cpf;
	items: Item[];
	code: string;
	orderCode: OrderCode;
	coupon?: Coupon;
	freight: number = 0;

	constructor (readonly idOrder: string | undefined, cpf: string, readonly date: Date = new Date(), readonly sequence: number = 1) {
		this.cpf = new Cpf(cpf);
		this.items = [];
		this.orderCode = new OrderCode(date, sequence);
		this.code = this.orderCode.getCode();
	}

	addItem (product: Product, quantity: number) {
		if (this.items.some(item => item.idProduct === product.idProduct)) throw new Error("Duplicated item");
		this.items.push(new Item(product.idProduct, product.price, quantity));
	}

	addCoupon (coupon: Coupon) {
		if (coupon.isValid(this.date)) this.coupon = coupon;
	}

	getTotal () {
		let total = 0;
		for (const item of this.items) {
			total += item.getTotal();
		}
		if (this.coupon) {
			total -= this.coupon.calculateDiscount(total);
		}
		total += this.freight;
		return total;
	}
}
