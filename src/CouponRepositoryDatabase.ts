import pgp from "pg-promise";
import Coupon from "./Coupon";
import CouponRepository from "./CouponRepository";

export default class CouponRepositoryDatabase implements CouponRepository {

	async get (code: string) {
		const connection = pgp()("postgres://postgres:123456@localhost:5432/app");
		const [couponData] = await connection.query("select * from cccat11.coupon where code = $1", [code]);
		await connection.$pool.end();
		if (!couponData) return undefined;
		return new Coupon(couponData.code, parseFloat(couponData.percentage), couponData.expire_date);
	}
}
