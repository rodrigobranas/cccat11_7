import ProductRepository from "../repository/ProductRepository";

export default interface RepositoryFactory {
	createProductRepository (): ProductRepository;
}
