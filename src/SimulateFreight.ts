import FreightCalculator from "./FreightCalculator";
import ProductRepository from "./ProductRepository";

export default class SimulateFreight {

	constructor (readonly productRepository: ProductRepository) {
	}

	async execute (input: Input): Promise<Output> {
		const output = {
			freight: 0
		};
		for (const item of input.items) {
			if (input.from && input.to) {
				const product = await this.productRepository.get(item.idProduct);
				const freight = FreightCalculator.calculate(product);
				output.freight += freight * item.quantity;
			}
		}
		return output;
	}
}

type Input = {
	items: { idProduct: number, quantity: number }[], 
	from?: string, 
	to?: string 
}

type Output = {
	freight: number
}