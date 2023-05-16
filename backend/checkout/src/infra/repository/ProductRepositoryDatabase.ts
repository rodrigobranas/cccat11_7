import pgp from "pg-promise";
import ProductRepository from "../../application/repository/ProductRepository";
import Product from "../../domain/entity/Product";
import DatabaseConnection from "../database/DatabaseConnection";

// interface adapters
export default class ProductRepositoryDatabase implements ProductRepository {

	constructor (readonly connection: DatabaseConnection) {
	}

	async list(): Promise<Product[]> {
		const productsData = await this.connection.query("select * from cccat11.product", []);
		const products: Product[] = [];
		for (const productData of productsData) {
			products.push(new Product(productData.id_product, productData.description, parseFloat(productData.price), productData.width, productData.height, productData.length, parseFloat(productData.weight)));
		}
		return products;
	}

	async get (idProduct: number) {
		const [productData] = await this.connection.query("select * from cccat11.product where id_product = $1", [idProduct]);
		return new Product(productData.id_product, productData.description, parseFloat(productData.price), productData.width, productData.height, productData.length, parseFloat(productData.weight));
	}

}
