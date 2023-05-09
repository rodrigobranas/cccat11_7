import Coupon from "./Coupon";

export default interface CouponRepository {
	get (code: string): Promise<Coupon | undefined>;
}
