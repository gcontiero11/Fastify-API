import type { CreateOrderReqModel } from "../schemas/order.schema";
import DiscountEngine from "../services/DiscountEngine";
import Item from "../domain/Item";
import Order from "../domain/Order";
import { Money } from "../utils/Money";
import { ResponseException } from "../../exception/ResponseException";
import type { Product } from "@prisma/client";
import ProductRepository from "../repositories/ProductRepository";
import Quote from "../domain/Quote";
import { ProductReqModel } from "../schemas/product.schema";

class OrderService {
  async createOrder(
    request: CreateOrderReqModel,
  ): Promise<Order | ResponseException> {
    try {
      const products: Product[] = await ProductRepository.findByProductIds(
        request.requestedProducts.map((item) => item.productId),
      );

      if (products.length !== request.requestedProducts.length) {
        throw new ResponseException("Product not found", 404);
      }

      const items = this.toItems(products, request.requestedProducts);
      const order = new Order(items);

      return DiscountEngine.calculateAndApplyDiscounts(order);
    } catch (error) {
      if (error instanceof ResponseException) return error;
      throw new ResponseException("Internal server error", 500);
    }
  }

  async createQuote(
    request: CreateOrderReqModel,
  ): Promise<Quote | ResponseException> {
    try {
      const products: Product[] = await ProductRepository.findByProductIds(
        request.requestedProducts.map((item) => item.productId),
      );
      const items = this.toItems(products, request.requestedProducts);
      const quote = new Quote(items);
      return quote;
    } catch (error) {
      if (error instanceof ResponseException) return error;
      throw new ResponseException("Internal server error", 500);
    }
  }

  private toItems(products: Product[], reqProducts: ProductReqModel[]): Item[] {
    const items: Item[] = [];

    for (const requestProduct of reqProducts) {
      const product = products.find(
        (p) => p.productId === requestProduct.productId,
      );

      if (!product) {
        throw new ResponseException("Product not found", 404);
      }

      items.push(
        new Item(
          product.productId,
          requestProduct.quantity,
          Money.fromCents(product.unitPrice, "BRL"),
          product.category,
        ),
      );
    }

    return items;
  }
}

export default new OrderService();
