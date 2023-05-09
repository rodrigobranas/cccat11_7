import Product from "./Product";

export default interface ProductRepository {
	get (idProduct: number): Promise<Product>;
}
