import express, { Router } from "express";
import asyncHandler from "express-async-handler";
import {
  create,
  find,
  findOne,
  remove,
  update,
} from "../controller/order.controller";

const router = express.Router();

export function orderRoutes(): Router {
  router.route("/").get(asyncHandler(find)).post(asyncHandler(create));

  router
    .route("/:id")
    .get(asyncHandler(findOne))
    .delete(asyncHandler(remove))
    .patch(asyncHandler(update));

  return router;
}
