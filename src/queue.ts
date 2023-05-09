import { connect } from "amqplib";
import Checkout from "./Checkout";
// boundary
async function main () {
	const connection = await connect("amqp://localhost");
	const channel = await connection.createChannel();
	await channel.assertQueue("checkout", { durable: true });
	channel.consume("checkout", async function (msg: any) {
		const input = JSON.parse(msg.content.toString());
		try {
			const checkout = new Checkout();
			const output = await checkout.execute(input);
			console.log(output);
		} catch (e: any) {
			console.log(e.message);
		}
		channel.ack(msg);
	});
}

main();