export default interface StockGateway {
	decreaseStock (input: Input): Promise<void>;
}

export type Input = {
	items: { idProduct: number, quantity: number }[]
}
