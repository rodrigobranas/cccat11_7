import Product from "../../domain/entity/Product";

export default interface ProductRepository {
	list (): Promise<Product[]>;
	get (idProduct: number): Promise<Product>;
}
