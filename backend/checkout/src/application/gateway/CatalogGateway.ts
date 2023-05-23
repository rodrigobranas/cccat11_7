import Product from "../../domain/entity/Product";

export default interface CatalogGateway {
	getProduct (idProduct: number): Promise<Product>;
}
