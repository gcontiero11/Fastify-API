import { Money } from "../core/utils/Money";

export const discounts = [
  {
    code: "QTY_TIE_10PCT",
    name: "Desconto por volume - 10%",
    fixed: Money.fromDecimal(0, "BRL"),
    rate: 0.1,
  },
  {
    code: "QTY_TIE_15PCT",
    name: "Desconto por volume - 15%",
    fixed: Money.fromDecimal(0, "BRL"),
    rate: 0.15,
  },
  {
    code: "QTY_TIE_20PCT",
    name: "Desconto por volume - 20%",
    fixed: Money.fromDecimal(0, "BRL"),
    rate: 0.2,
  },
  {
    code: "CART_VALUE_FIXED_50",
    name: "Desconto por valor do carrinho - R$50 fixo",
    fixed: Money.fromDecimal(50, "BRL"),
    rate: 0,
  },
  {
    code: "CART_VALUE_FIXED_150",
    name: "Desconto por valor do carrinho - R$150 fixo",
    fixed: Money.fromDecimal(150, "BRL"),
    rate: 0,
  },
  {
    code: "CAT_ACC_5PCT",
    name: "Categoria acessórios 5%",
    fixed: Money.fromDecimal(0, "BRL"),
    rate: 0.05,
  },
];
