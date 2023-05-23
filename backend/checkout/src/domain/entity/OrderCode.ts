// Value Object
export default class OrderCode {
	private value: string;

	constructor (date: Date, sequence: number) {
		this.value = `${date.getFullYear()}${new String(sequence).padStart(8, "0")}`
	}

	getCode () {
		return this.value;
	}
}
