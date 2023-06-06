import UsecaseFactory from "../factory/UsecaseFactory";
import Queue from "./Queue";

export default class QueueControlle {

	constructor (readonly queue: Queue, readonly usecaseFactory: UsecaseFactory) {
		const checkout = usecaseFactory.createCheckout();
		// handler
		queue.on("checkout", async function (input: any) {
			await checkout.execute(input);
		});
	}
}