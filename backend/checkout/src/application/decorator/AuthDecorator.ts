import GatewayFactory from "../factory/GatewayFactory";
import AuthGateway from "../gateway/AuthGateway";
import Usecase from "../usecase/Usecase";

export default class AuthDecorator implements Usecase {
	authGateway: AuthGateway;

	constructor (readonly usecase: Usecase, readonly gatewayFactory: GatewayFactory) {
		this.authGateway = gatewayFactory.createAuthGateway();
	}

	async execute(input: any): Promise<any> {
		if (input.token) {
			const session = await this.authGateway.verify(input.token);
			console.log(session);
			if (!session) throw new Error("Authentication failed");
		}
		return this.usecase.execute(input);
	}

}