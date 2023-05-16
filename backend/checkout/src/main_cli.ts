// import Checkout from "./application/usecase/Checkout";
// // boundary
// const input: { 
// 	cpf: string, 
// 	items: { idProduct: number, quantity: number }[], 
// 	coupon?: string, 
// 	from?: string, 
// 	to?: string 
// } = {
// 	cpf: "",
// 	items: []
// };

// process.stdin.on("data", async function (data) {
// 	const command = data.toString().replace(/\n/g, "");
// 	if (command.startsWith("set-cpf")) {
// 		input.cpf = command.replace("set-cpf ", "");
// 		console.log(input);
// 		return;
// 	}
// 	if (command.startsWith("add-item")) {
// 		console.log("add-item");
// 		const [idProduct, quantity] = command.replace("add-item ", "").split(" ");
// 		input.items.push({ idProduct: parseInt(idProduct), quantity: parseInt(quantity) });
// 		console.log(input);
// 		return;
// 	}
// 	if (command.startsWith("checkout")) {
// 		console.log("checkout");
// 		const checkout = new Checkout();
// 		try {
// 			const output = await checkout.execute(input);
// 			console.log(output);
// 		} catch (e: any) {
// 			console.log(e.message);
// 		}
// 		return;
// 	}
// 	if (command.startsWith("quit")) {
// 		console.log("quit");
// 		process.exit();
// 	}
// 	console.log("Invalid command");
// });