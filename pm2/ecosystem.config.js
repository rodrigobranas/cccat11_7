module.exports = {
  apps : [
	{
		name: "auth",
		script: "npx ts-node ../backend/auth/src/main_api.ts"
	},
	{
		name: "catalog",
		script: "npx ts-node ../backend/catalog/src/main_api.ts"
	},
	{
		name: "checkout",
		script: "npx ts-node ../backend/checkout/src/main_api.ts"
	},
	{
		name: "freight",
		script: "npx ts-node ../backend/freight/src/main_api.ts"
	},
	{
		name: "stock",
		script: "npx ts-node ../backend/stock/src/main_api.ts"
	}
  ]
};
