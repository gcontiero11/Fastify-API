import { discounts } from "../../prisma/discounts";
import Discount from "../domain/Discount";
import Item from "../domain/Item";
import Order from "../domain/Order";
import { Money } from "../utils/Money";

class DiscountEngine {
  calculateAndApplyDiscounts(order: Order): Order {
    const items = order.getItems();
    let total = Money.fromCents(0, "BRL");

    console.log(`Calculando descontos por item`);
    items.forEach((item) => {
      console.log(`🔍 Verificando descontos no item: ${item.getProductId()}`);
      this.applyCategoryDiscountBy(item);
      total = total.add(item.getTotal());
    });
    order.setTotal(total);
    console.log(`Calculando descontos por quantidade de unidades no pedido`);
    this.applyQuantityDiscount(order);
    console.log(`Calculando descontos por valor do carrinho`);
    this.applyDiscountByCartValue(order);
    return order;
  }

  private applyCategoryDiscountBy(item: Item) {
    const isAccessory = item.getCategory() === "acessorios";
    const meetsQuantity = item.getQuantity() > 5;

    if (isAccessory && meetsQuantity) {
      console.log(
        `   Categoria: ${item.getCategory()}, Quantidade: ${item.getQuantity()}`,
      );
      this.applyDiscountIntoItem(item, "CAT_ACC_5PCT");
    }
  }

  private applyQuantityDiscount(order: Order) {
    const quantity = order
      .getItems()
      .reduce((acc, item) => acc + item.getQuantity(), 0);

    if (quantity >= 50) {
      console.log(
        `🔍 Aplicando desconto por quantidade: ${quantity} itens >= 50`,
      );
      this.applyDiscountIntoOrder(order, "QTY_TIE_20PCT");
    } else if (quantity >= 20) {
      console.log(
        `🔍 Aplicando desconto por quantidade: ${quantity} itens >= 20`,
      );
      this.applyDiscountIntoOrder(order, "QTY_TIE_15PCT");
    } else if (quantity >= 10) {
      console.log(
        `🔍 Aplicando desconto por quantidade: ${quantity} itens >= 10`,
      );
      this.applyDiscountIntoOrder(order, "QTY_TIE_10PCT");
    }
  }

  private applyDiscountIntoItem(item: Item, code: string) {
    const discount = this.getDiscountByCode(code);
    const totalBeforeDiscount = item.getTotal();

    console.log(
      `💰 Aplicando desconto ${code} de ${discount.getRate() * 100}% no item ${item.getProductId()}:`,
    );
    console.log(`    Basis: R$ ${totalBeforeDiscount.toDecimal()}`);

    discount.setMetadata(
      this.generateMetadataForCategoryDiscount(item.getQuantity()),
    );
    const appliedDiscount = discount.applyInto(item.getTotal());

    item.setTotal(appliedDiscount.amount);
    item.addAppliedDiscount(appliedDiscount);

    console.log(`    Amount: R$ ${appliedDiscount.amount.toDecimal()}`);
  }

  private generateMetadataForCategoryDiscount(units: number): object {
    return {
      message: `number of acessories items => ${units} > 5 units = 5% discount`,
    };
  }

  private applyDiscountIntoOrder(order: Order, code: string) {
    const discount = this.getDiscountByCode(code);
    const totalBeforeDiscount = order.getTotal();

    console.log(`🛒 Aplicando desconto ${code} no pedido:`);
    console.log(`   Taxa de desconto: ${discount.getRate() * 100}%`);
    console.log(`   Desconto fixo: R$ ${discount.getFixed().toDecimal()}`);
    console.log(`   Basis: R$ ${totalBeforeDiscount.toDecimal()}`);

    discount.setMetadata(this.generateMetadata(discount, order));
    const appliedDiscount = discount.applyInto(order.getTotal());
    order.setTotal(appliedDiscount.amount);
    order.addAppliedDiscount(appliedDiscount);

    console.log(`   Amount: R$ ${appliedDiscount.amount.toDecimal()}`);
  }

  private applyDiscountByCartValue(order: Order) {
    const cartValue = order.getTotal().toDecimal();

    if (cartValue >= 2000) {
      console.log(
        `🔍 Verificando desconto por valor do carrinho: R$ ${cartValue} >= R$ 2000`,
      );
      this.applyDiscountIntoOrder(order, "CART_VALUE_FIXED_150");
    } else if (cartValue >= 1000) {
      console.log(
        `🔍 Verificando desconto por valor do carrinho: R$ ${cartValue} >= R$ 1000`,
      );
      this.applyDiscountIntoOrder(order, "CART_VALUE_FIXED_50");
    } else {
      console.log(
        `🔍 Valor do carrinho R$ ${cartValue} não atende aos critérios de desconto por valor do carrinho`,
      );
    }
  }

  private getDiscountByCode(code: string): Discount {
    const discountType = discounts.find((discount) => discount.code === code);
    if (!discountType) {
      throw new Error("Discount type not found");
    }
    return new Discount({
      code: discountType.code,
      name: discountType.name,
      fixed: discountType.fixed,
      rate: discountType.rate,
    });
  }

  private generateMetadata(discount: Discount, order: Order) {
    if (this.isFixedDiscount(discount)) {
      return {
        message: `cart value = R$${order.getTotal().toDecimal()} >= R$${discount.getFixed().toDecimal() === 50 ? "1000" : "2000"} = R$${discount.getFixed().toDecimal()} fixed discount`,
      };
    }
    const numberOfUnits = order
      .getItems()
      .reduce((acc, item) => acc + item.getQuantity(), 0);

    const tier =
      numberOfUnits >= 50
        ? 50
        : numberOfUnits >= 20
          ? 20
          : numberOfUnits >= 10
            ? 10
            : 0;

    return {
      message: `Items quantity ${numberOfUnits} >= ${tier} = ${discount.getRate() * 100}% discount`,
    };
  }

  private isFixedDiscount(discount: Discount) {
    return discount.getFixed().toDecimal() > 0;
  }

  private isCategoryDiscount(discount: Discount) {
    return discount.getRate() > 0.05;
  }
}

export default new DiscountEngine();
