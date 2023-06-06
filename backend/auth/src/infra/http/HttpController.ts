import HttpServer from "./HttpServer";
import UsecaseFactory from "../factory/UsecaseFactory";

// interface adapter
export default class HttpController {

	constructor (httpServer: HttpServer, usecaseFactory: UsecaseFactory) {

		httpServer.on("post", "/verify", async function (params: any, body: any, headers: any) {
			const verify = usecaseFactory.createVerify();
			const output = await verify.execute(body.token);
			return output;
		});

	}
}
