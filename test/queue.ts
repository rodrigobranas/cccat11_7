import { connect } from "amqplib";

async function main () {
	const connection = await connect("amqp://localhost");
	const channel = await connection.createChannel();
	await channel.assertQueue("checkout", { durable: true });
	const input = {
		cpf: "407.302.170-27",
		items: [
			{ idProduct: 1, quantity: 1 },
			{ idProduct: 2, quantity: 1 },
			{ idProduct: 3, quantity: 3 }
		]
	};
	channel.sendToQueue("checkout", Buffer.from(JSON.stringify(input)));
}

main();