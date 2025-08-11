import OrderController from "../controllers/OrderController";
import {
  createOrderReqSchema,
  createOrderResSchema,
} from "../core/schemas/order.schema";
import { quoteResSchema } from "../core/schemas/quote.schema";
import type { FastifyTypedInstance } from "../types/types";

export default async function orderRoutes(app: FastifyTypedInstance) {
  app.post("/", {
    schema: {
      tags: ["orders"],
      body: createOrderReqSchema,
      response: {
        201: createOrderResSchema,
      },
    },
    preHandler: [],
    handler: OrderController.createOrder,
  });
  app.post("/quote", {
    schema: {
      tags: ["orders"],
      body: createOrderReqSchema,
      response: {
        201: quoteResSchema,
      },
    },
    preHandler: [],
    handler: OrderController.createQuote,
  });
}
