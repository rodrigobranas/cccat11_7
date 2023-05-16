import pgp from "pg-promise";
import Coupon from "../../domain/entity/Coupon";
import CouponRepository from "../../application/repository/CouponRepository";
import DatabaseConnection from "../database/DatabaseConnection";

// Interface Adapter
export default class CouponRepositoryDatabase implements CouponRepository {

	constructor (readonly connection: DatabaseConnection) {
	}

	async get (code: string) {
		const [couponData] = await this.connection.query("select * from cccat11.coupon where code = $1", [code]);
		if (!couponData) return undefined;
		return new Coupon(couponData.code, parseFloat(couponData.percentage), couponData.expire_date);
	}
}
