import AuthGateway from "../gateway/AuthGateway";
import CatalogGateway from "../gateway/CatalogGateway";
import FreightGateway from "../gateway/FreightGateway";
import StockGateway from "../gateway/StockGateway";

export default interface GatewayFactory {
	createCatalogGateway(): CatalogGateway;
	createFreightGateway(): FreightGateway;
	createAuthGateway(): AuthGateway;
	createStockGateway(): StockGateway;
}
