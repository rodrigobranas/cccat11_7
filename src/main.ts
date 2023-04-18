import express, { Request, Response } from "express";
import { validate } from "./validateCpf";
import pgp from "pg-promise";
const app = express();
app.use(express.json());
app.post("/checkout", async function (req: Request, res: Response) {
	if (validate(req.body.cpf)) {
		const connection = pgp()("postgres://postgres:123456@localhost:5432/app");
		const output = {
			total: 0
		};
		if (req.body.items) {
			for (const item of req.body.items) {
				const [productData] = await connection.query("select * from cccat11.product where id_product = $1", [item.idProduct]);
				const price = parseFloat(productData.price);
				output.total += price * item.quantity;		
			}
		}
		if (req.body.coupon) {
			const [couponData] = await connection.query("select * from cccat11.coupon where code = $1", [req.body.coupon]);
			output.total -= (output.total * parseFloat(couponData.percentage))/100;
		}
		res.json(output);
	} else {
		res.json({
			message: "Invalid cpf"
		});
	}
});
app.listen(3000);
