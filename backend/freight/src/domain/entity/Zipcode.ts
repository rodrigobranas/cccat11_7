import Coord from "./Coord";

// Entity - Aggregate Root
export default class Zipcode {
	coord: Coord;

	constructor (readonly code: string, readonly lat: number, readonly long: number) {
		this.coord = new Coord(lat, long);
	}
}
