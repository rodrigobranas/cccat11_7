import UsecaseFactory from "../factory/UsecaseFactory";
import Queue from "./Queue";

export default class QueueController {

	constructor (readonly queue: Queue, readonly usecaseFactory: UsecaseFactory) {
		const decreaseStock = usecaseFactory.createDecreaseStock();
		queue.on("orderPlaced", async function (input: any) {
			await decreaseStock.execute(input);
		});
	}
}