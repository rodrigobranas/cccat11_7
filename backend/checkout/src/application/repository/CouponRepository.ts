import Coupon from "../../domain/entity/Coupon";

export default interface CouponRepository {
	get (code: string): Promise<Coupon | undefined>;
}
