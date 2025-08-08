import { discounts } from "../../db/discounts.ts";
import Discount from "../../models/Discount.ts";
import Item from "../../models/Item.ts";
import Order from "../../models/Order.ts";
import { Money } from "../../models/Money.ts";

class DiscountEngine {
  calculateAndApplyDiscounts(order: Order): Order {
    const items = order.getItems();
    let total = Money.fromCents(0, "BRL");

    items.forEach(item => {
      this.applyDiscountsBy(item);
      total = total.add(item.getTotal());
    });
    order.setTotal(total);
    console.log("Total after item discounts:", total);
    this.applyQuantityDiscount(order);
    console.log("Total after quantity discounts:", order.getTotal());
    this.applyDiscountByCartValue(order);
    console.log("Total after cart value discounts:", order.getTotal());
    return order;
  }

  private applyDiscountsBy(item: Item) {
    this.applyCategoryDiscount(item);
  }

  private applyCategoryDiscount(item: Item) {
    const isAccessory = item.getCategory() === "acessorios";
    const meetsQuantity = item.getQuantity() > 5;

    if (isAccessory && meetsQuantity) {
      this.applyDiscountIntoItem(item, "CAT_ACC_5PCT");
    }
  }

  private applyQuantityDiscount(order: Order) {
    const quantity = order.getItems().reduce((acc, item) => acc + item.getQuantity(), 0);

    if (quantity >= 50) {
      this.applyDiscountIntoOrder(order, "QTY_TIE_20PCT");
    } else if (quantity >= 20) {
      this.applyDiscountIntoOrder(order, "QTY_TIE_15PCT");
    } else if (quantity >= 10) {
      this.applyDiscountIntoOrder(order, "QTY_TIE_10PCT");
    }
  }

  private applyDiscountIntoItem(item: Item, code: string) {
    const discount = this.getDiscountByCode(code);
    const appliedDiscount = discount.applyInto(item.getTotal());

    item.setTotal(appliedDiscount.amount);
    item.addAppliedDiscount(appliedDiscount);
  }

  private applyDiscountIntoOrder(order: Order, code: string) {
    const discount = this.getDiscountByCode(code);
    const appliedDiscount = discount.applyInto(order.getTotal());
    order.setTotal(appliedDiscount.amount);
    order.addAppliedDiscount(appliedDiscount);
  }

  private applyDiscountByCartValue(order: Order) {
    if (order.getTotal().toDecimal() >= 2000) {
      this.applyDiscountIntoOrder(order, "CART_VALUE_FIXED_150");
    } else if (order.getTotal().toDecimal() >= 1000) {
      this.applyDiscountIntoOrder(order, "CART_VALUE_FIXED_50");
    }
  }

  private getDiscountByCode(code: string): Discount {
    const discountType = discounts.find(discount => discount.code === code);
    if (!discountType) {
      throw new Error("Discount type not found");
    }
    return new Discount({
      code: discountType.code,
      name: discountType.name,
      fixed: discountType.fixed,
      rate: discountType.rate
    });
  }
}

export default new DiscountEngine();