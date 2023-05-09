import Product from "./Product";

export default class FreightCalculator {

	static calculate (product: Product) {
		let freight = product.getVolume() * 1000 * (product.getDensity()/100);
		return Math.max(10, freight);
	}
}
