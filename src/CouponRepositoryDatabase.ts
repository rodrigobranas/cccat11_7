import pgp from "pg-promise";

export default class CouponRepositoryDatabase {

	async get (code: string) {
		const connection = pgp()("postgres://postgres:123456@localhost:5432/app");
		const [couponData] = await connection.query("select * from cccat11.coupon where code = $1", [code]);
		await connection.$pool.end();
		return couponData;
	}
}
