export default class Product {

	// Entity
	constructor (readonly idProduct: number, readonly description: string, readonly price: number, readonly width: number, readonly height: number, readonly length: number, readonly weight: number, readonly volume: number = 0, readonly density: number = 0) {
	}
}
