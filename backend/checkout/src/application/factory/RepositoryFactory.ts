import CouponRepository from "../repository/CouponRepository";
import OrderRepository from "../repository/OrderRepository";

export default interface RepositoryFactory {
	createOrderRepository (): OrderRepository;
	createCouponRepository (): CouponRepository;
}
