import HttpServer from "./HttpServer";
import Hapi from "@hapi/hapi";

// framework and driver
export default class HapiAdapter implements HttpServer {
	server: Hapi.Server;

	constructor () {
		this.server = Hapi.server({});
	}

	on(method: string, url: string, callback: Function): void {
		this.server.route({
			method,
			path: url,
			handler: async function (req: any, reply: any) {
				try {
					const output = await callback(req.params, req.payload);
					return output;
				} catch (e: any) {
					return reply.response({
						message: e.message
					}).code(422);
				}
			}
		});
	}

	listen(port: number): void {
		this.server.settings.port = port;
		this.server.start();
	}

}
