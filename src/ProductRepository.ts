export default interface ProductRepository {
	get (idProduct: number): Promise<any>;
}
