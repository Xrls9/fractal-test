import { Product } from "@prisma/client";
import { plainToClass } from "class-transformer";
import { Request, Response } from "express";
import { ProductService } from "../services/product.service";
import { ProductDto } from "../dtos/Product.dto";

export async function find(req: Request, res: Response): Promise<void> {
  const result = await ProductService.find();

  res.status(200).json(result);
}

export async function findOne(req: Request, res: Response): Promise<void> {
  const { productId } = req.body;

  const result = await ProductService.findOne(+productId);

  res.status(200).json(result);
}

export async function create(req: Request, res: Response): Promise<void> {
  const result = await ProductService.create(
    plainToClass(ProductDto, req.body)
  );

  res.status(200).json(result);
}

export async function update(req: Request, res: Response): Promise<void> {
  const product = req.body;
  const productId = req.params.id;

  const result = await ProductService.update(
    plainToClass(ProductDto, product),
    +productId
  );

  res.status(200).json(result);
}

export async function remove(req: Request, res: Response): Promise<void> {
  const productId = req.params.id;

  const result = await ProductService.delete(+productId);

  res.status(200).json(result);
}
