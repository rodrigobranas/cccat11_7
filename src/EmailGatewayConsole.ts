import EmailGateway from "./EmailGateway";

export default class EmailGatewayConsole implements EmailGateway {
	
	async send(subject: string, message: string, to: string, from: string): Promise<void> {
		console.log(subject, message, to, from);
	}

}