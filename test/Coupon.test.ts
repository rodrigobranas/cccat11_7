import Coupon from "../src/Coupon";

test("Deve testar se o cupom é válido", function () {
	const coupon = new Coupon("VALE20", 20, new Date("2023-10-01T10:00:00"));
	expect(coupon.isValid(new Date("2023-03-01T10:00:00"))).toBe(true);
});

test("Deve calcular o desconto", function () {
	const coupon = new Coupon("VALE20", 20, new Date("2023-10-01T10:00:00"));
	expect(coupon.calculateDiscount(1000)).toBe(200);
});

test("Deve testar se o cupom é inválido", function () {
	const coupon = new Coupon("VALE20", 20, new Date("2023-03-01T10:00:00"));
	expect(coupon.isValid(new Date("2023-04-01T10:00:00"))).toBe(false);
});
