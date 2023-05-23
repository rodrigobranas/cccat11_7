import Checkout from "./application/usecase/Checkout";
import DatabaseRepositoryFactory from "./infra/factory/DatabaseRepositoryFactory";
import ExpressAdapter from "./infra/http/ExpressAdapter";
import HapiAdapter from "./infra/http/HapiAdapter";
import HttpController from "./infra/http/HttpController";
import PgPromiseAdapter from "./infra/database/PgPromiseAdapter";
import UsecaseFactory from "./infra/factory/UsecaseFactory";
import AxiosAdapter from "./infra/http/AxiosAdapter";
import GatewayHttpFactory from "./infra/factory/GatewayHttpFactory";

// main
const connection = new PgPromiseAdapter();
connection.connect();
const repositoryFactory = new DatabaseRepositoryFactory(connection);
const httpClient = new AxiosAdapter();
const gatewayFactory = new GatewayHttpFactory(httpClient);
const usecaseFactory = new UsecaseFactory(repositoryFactory, gatewayFactory);
const httpServer = new ExpressAdapter();
// const httpServer = new HapiAdapter();
new HttpController(httpServer, usecaseFactory);
httpServer.listen(3000);
