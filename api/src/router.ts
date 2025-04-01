import express, { Router } from "express";
import { productRoutes } from "./modules/product/routes/product.route";
import { orderRoutes } from "./modules/order/routes/order.route";

const expressRouter = express.Router();

export function router(app: Router): Router {
  app.use("/api/products", productRoutes());
  app.use("/api/orders", orderRoutes());

  return expressRouter;
}
