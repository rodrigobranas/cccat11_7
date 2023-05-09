// boundary
export default interface EmailGateway {
	send (subject: string, message: string, to: string, from: string): Promise<void>;
}
