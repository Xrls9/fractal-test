import express, { Router } from "express";
import { productRoutes } from "./modules/product/routes/product.route";

const expressRouter = express.Router();

export function router(app: Router): Router {
  app.use("/api/products", productRoutes());

  return expressRouter;
}
