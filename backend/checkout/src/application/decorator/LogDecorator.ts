import GatewayFactory from "../factory/GatewayFactory";
import AuthGateway from "../gateway/AuthGateway";
import Usecase from "../usecase/Usecase";

export default class AuthDecorator implements Usecase {

	constructor (readonly usecase: Usecase, readonly gatewayFactory: GatewayFactory) {
	}

	async execute(input: any): Promise<any> {
		console.log(input);
		return this.usecase.execute(input);
	}

}