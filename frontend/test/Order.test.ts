import Order from "../src/entity/Order";
import Product from "../src/entity/Product";

test("Deve testar o pedido", function () {
	const order = new Order("A", "B");
	order.addItem(new Product(1, "A", 1000));
	order.addItem(new Product(1, "A", 1000));
	order.addItem(new Product(1, "A", 1000));
	expect(order.getTotal()).toBe(3000);
	expect(order.items).toHaveLength(1);
});
