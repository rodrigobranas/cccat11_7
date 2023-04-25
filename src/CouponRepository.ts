export default interface CouponRepository {
	get (code: string): Promise<any>;
}
