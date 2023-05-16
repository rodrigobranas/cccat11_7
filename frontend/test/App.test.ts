import { mount } from "@vue/test-utils";
import AppVue from "../src/App.vue";
import HttpCheckoutGateway from "../src/gateway/HttpCheckoutGateway";
import CheckoutGateway from "../src/gateway/CheckoutGateway";
import AxiosAdapter from "../src/http/AxiosAdapter";
import FetchAdapter from "../src/http/FetchAdapter";

async function sleep (time: number) {
	return new Promise((resolve) => {
		setTimeout(() => {
			resolve(true);
		}, time);
	});
}

test("Deve testar tudo", async function () {
	const checkoutGateway: CheckoutGateway = {
		async getProducts (): Promise<any> {
			return [
				{ idProduct: 1, description: "A", price: 1000 },
				{ idProduct: 2, description: "B", price: 5000 },
				{ idProduct: 3, description: "C", price: 30 }
			]
		},
		async checkout (order: any): Promise<any> {
			return { freight: 0, total: 6090 };
		}
	};
	// const httpClient = new AxiosAdapter();
	const httpClient = new FetchAdapter();
	const httpCheckoutGateway = new HttpCheckoutGateway(httpClient);
	const wrapper = mount(AppVue, {
		global: {
			provide: {
				"checkoutGateway": httpCheckoutGateway
			}
		}
	});
	await sleep(100);
	expect(wrapper.get(".module-name").text()).toBe("Checkout");
	expect(wrapper.findAll(".product-description").at(0)?.text()).toBe("A");
	expect(wrapper.findAll(".product-price").at(0)?.text()).toBe("1000");
	expect(wrapper.findAll(".product-description").at(1)?.text()).toBe("B");
	expect(wrapper.findAll(".product-price").at(1)?.text()).toBe("5000");
	expect(wrapper.findAll(".product-description").at(2)?.text()).toBe("C");
	expect(wrapper.findAll(".product-price").at(2)?.text()).toBe("30");
	await wrapper.findAll(".product-add-button").at(0)?.trigger("click");
	await wrapper.findAll(".product-add-button").at(1)?.trigger("click");
	await wrapper.findAll(".product-add-button").at(2)?.trigger("click");
	await wrapper.findAll(".product-add-button").at(2)?.trigger("click");
	await wrapper.findAll(".product-add-button").at(2)?.trigger("click");
	expect(wrapper.get(".total").text()).toBe("6090");
	expect(wrapper.findAll(".order-item").at(0)?.text()).toBe("1 1");
	expect(wrapper.findAll(".order-item").at(1)?.text()).toBe("2 1");
	expect(wrapper.findAll(".order-item").at(2)?.text()).toBe("3 3");
	await wrapper.get(".checkout-button").trigger("click");
	await sleep(100);
	expect(wrapper.get(".success").text()).toBe("6090");
});
