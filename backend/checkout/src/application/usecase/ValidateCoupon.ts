import CouponRepository from "../repository/CouponRepository";
import RepositoryFactory from "../factory/RepositoryFactory";

export default class ValidateCoupon {
	couponRepository: CouponRepository;

	constructor (repositoryFactory: RepositoryFactory) {
		this.couponRepository = repositoryFactory.createCouponRepository();
	}

	async execute (code: string): Promise<Output> {
		const output = {
			isValid: false
		};
		const coupon = await this.couponRepository.get(code);
		if (!coupon) return output;
		const today = new Date();
		output.isValid = coupon.isValid(today);
		return output;
	}	
}

type Output = {
	isValid: boolean
}