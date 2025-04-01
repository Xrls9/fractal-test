import { Order } from "@prisma/client";
import { plainToClass } from "class-transformer";
import { Request, Response } from "express";
import { OrderService } from "../services/order.service";

export async function find(req: Request, res: Response): Promise<void> {
  const result = await OrderService.find();

  res.status(200).json(result);
}
