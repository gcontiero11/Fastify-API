import Item from "../core/domain/Item";
import { Money } from "../core/utils/Money";
import Order from "../core/domain/Order";
import DiscountEngine from "../core/services/DiscountEngine";

describe("DiscountEngine", () => {
  it.each([
    [new Item("sku-001", 1, Money.fromDecimal(1, "BRL"), ""), 1],
    [new Item("sku-001", 1, Money.fromDecimal(100, "BRL"), ""), 100],
    [new Item("sku-001", 1, Money.fromDecimal(999, "BRL"), ""), 999],
    [new Item("sku-001", 5, Money.fromDecimal(10, "BRL"), "acessorios"), 50],
    [new Item("sku-001", 9, Money.fromDecimal(15, "BRL"), ""), 135],
  ])("should not apply any discount", (item, expectedTotal) => {
    const order = new Order([item]);
    const discount = DiscountEngine.calculateAndApplyDiscounts(order);
    expect(discount.getTotal().toDecimal()).toBe(expectedTotal);
  });

  it.each([
    [1000, 950],
    [2000, 1850],
  ])("should apply fixed discount correctly", (total, expectedTotal) => {
    const items = [new Item("sku-001", 1, Money.fromDecimal(total, "BRL"), "")];
    const order = new Order(items);
    const discount = DiscountEngine.calculateAndApplyDiscounts(order);
    expect(discount.getTotal().toDecimal()).toBe(expectedTotal);
  });

  it.each([
    [5, 50],
    [10, 90],
    [19, 171],
    [20, 170],
    [49, 416.5],
    [50, 400],
  ])("should apply volume discount correctly", (total, expectedTotal) => {
    const items = [
      new Item("sku-001", total, Money.fromDecimal(10, "BRL"), ""),
    ];
    const order = new Order(items);
    const discount = DiscountEngine.calculateAndApplyDiscounts(order);
    expect(discount.getTotal().toDecimal()).toBe(expectedTotal);
  });

  it("should return with 5% discount for accessories", () => {
    const items = [
      new Item("sku-001", 6, Money.fromDecimal(10, "BRL"), "acessorios"),
    ];
    const order = new Order(items);
    const discount = DiscountEngine.calculateAndApplyDiscounts(order);
    expect(discount.getTotal().toDecimal()).toBe(57);
  });
  it.each([
    [
      [
        new Item("sku-001", 6, Money.fromDecimal(10, "BRL"), "acessorios"),
        new Item("sku-001", 1, Money.fromDecimal(1500, "BRL"), ""),
        new Item("sku-001", 20, Money.fromDecimal(1, "BRL"), ""),
      ],
      1290.45,
    ],
    [
      [
        new Item("sku-001", 6, Money.fromDecimal(1000, "BRL"), "acessorios"), //6000 * 0.95 = 5700
        new Item("sku-001", 1, Money.fromDecimal(1500, "BRL"), ""), //5700 + 1500 + 46 = 7246
        new Item("sku-001", 46, Money.fromDecimal(1, "BRL"), ""), //7246 * 0.8 = 5796.8
      ], //5796.8 - 150 = 5646.8
      5646.8,
    ],
  ])("should apply all discounts correctly", (items, expectedTotal) => {
    const order = new Order(items);
    const discount = DiscountEngine.calculateAndApplyDiscounts(order);
    expect(discount.getTotal().toDecimal()).toBe(expectedTotal);
  });
});
