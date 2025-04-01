import { Order } from "@prisma/client";
import { plainToClass } from "class-transformer";
import { Request, Response } from "express";
import { OrderService } from "../services/order.service";
import { OrderDto } from "../dtos/Order.dto";

export async function find(req: Request, res: Response): Promise<void> {
  const result = await OrderService.find();

  res.status(200).json(result);
}

export async function findOne(req: Request, res: Response): Promise<void> {
  const orderId = req.params.id;

  const result = await OrderService.findOne(+orderId);

  res.status(200).json(result);
}

export async function create(req: Request, res: Response): Promise<void> {
  const result = await OrderService.create(plainToClass(OrderDto, req.body));

  res.status(200).json(result);
}

export async function update(req: Request, res: Response): Promise<void> {
  const product = req.body;
  const productId = req.params.id;

  const result = await OrderService.update(
    plainToClass(OrderDto, product),
    +productId
  );

  res.status(200).json(result);
}

export async function remove(req: Request, res: Response): Promise<void> {
  const productId = req.params.id;

  const result = await OrderService.delete(+productId);

  res.status(200).json(result);
}
