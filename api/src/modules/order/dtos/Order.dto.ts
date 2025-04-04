import { IsArray, IsNumber, IsString } from "class-validator";

export class OrderProduct {
  @IsNumber()
  id: number;

  @IsNumber()
  productId: number;

  @IsNumber()
  orderId: number;

  @IsNumber()
  quantity: number;

  @IsNumber()
  total: number;
}

export class OrderDto {
  @IsNumber()
  id: number;

  @IsString()
  orderNumber: string;

  @IsString()
  date: string;

  @IsNumber()
  total: number;

  @IsArray()
  OrderProduct: OrderProduct[];
}
