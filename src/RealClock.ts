import Clock from "./Clock";

export default class RealClock implements Clock {
	
	getDate(): Date {
		return new Date();
	}

}
