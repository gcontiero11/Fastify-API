import { Money } from "../core/utils/Money";

export const products = [
  {
    productId: "sku-001",
    unitPrice: Money.fromDecimal(20.99, "BRL"),
    category: "acessorios",
  },
  {
    productId: "sku-002",
    unitPrice: Money.fromDecimal(15.49, "BRL"),
    category: "acessorios",
  },
  {
    productId: "sku-003",
    unitPrice: Money.fromDecimal(9.75, "BRL"),
    category: "",
  },
  {
    productId: "sku-004",
    unitPrice: Money.fromDecimal(32.0, "BRL"),
    category: "acessorios",
  },
  {
    productId: "sku-005",
    unitPrice: Money.fromDecimal(12.6, "BRL"),
    category: "acessorios",
  },
  {
    productId: "sku-006",
    unitPrice: Money.fromDecimal(8.99, "BRL"),
    category: "",
  },
  {
    productId: "sku-007",
    unitPrice: Money.fromDecimal(44.3, "BRL"),
    category: "vestuario",
  },
  {
    productId: "sku-008",
    unitPrice: Money.fromDecimal(27.15, "BRL"),
    category: "",
  },
  {
    productId: "sku-009",
    unitPrice: Money.fromDecimal(18.9, "BRL"),
    category: "fitness",
  },
  {
    productId: "sku-010",
    unitPrice: Money.fromDecimal(39.99, "BRL"),
    category: "",
  },
];
