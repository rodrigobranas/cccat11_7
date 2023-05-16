import Order from "../entity/Order";
import Product from "../entity/Product";
import HttpClient from "../http/HttpClient";
import CheckoutGateway from "./CheckoutGateway";

export default class HttpCheckoutGateway implements CheckoutGateway {
	
	constructor (readonly httpClient: HttpClient) {
	}

	async getProducts(): Promise<Product[]> {
		const productsData = await this.httpClient.get("http://localhost:3000/products");
		const products: Product[] = [];
		for (const productData of productsData) {
			products.push(new Product(productData.idProduct, productData.description, productData.price));
		}
		return products;
	}

	async checkout(order: Order): Promise<any> {
		return this.httpClient.post("http://localhost:3000/checkout", order);
	}

}