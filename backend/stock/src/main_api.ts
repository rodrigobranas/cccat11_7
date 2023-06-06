import DatabaseRepositoryFactory from "./infra/factory/DatabaseRepositoryFactory";
import ExpressAdapter from "./infra/http/ExpressAdapter";
import HapiAdapter from "./infra/http/HapiAdapter";
import HttpController from "./infra/http/HttpController";
import PgPromiseAdapter from "./infra/database/PgPromiseAdapter";
import UsecaseFactory from "./infra/factory/UsecaseFactory";
import RabbitMQAdapter from "./infra/queue/RabbitMQAdapter";
import QueueController from "./infra/queue/QueueController";

// main
async function main () {
	const connection = new PgPromiseAdapter();
	connection.connect();
	const repositoryFactory = new DatabaseRepositoryFactory(connection);
	const usecaseFactory = new UsecaseFactory(repositoryFactory);
	const queue = new RabbitMQAdapter();
	await queue.connect();
	new QueueController(queue, usecaseFactory);
	const httpServer = new ExpressAdapter();
	// const httpServer = new HapiAdapter();
	new HttpController(httpServer, usecaseFactory);
	httpServer.listen(3005);
}

main();
