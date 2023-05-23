// Domain Service
export default class FreightCalculator {

	static calculate (distance: number, volume: number, density: number) {
		let freight = volume * distance * (density/100);
		return Math.max(10, freight);
	}
}
