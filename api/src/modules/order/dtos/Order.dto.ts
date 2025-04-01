import { IsNumber, IsString } from "class-validator";

export class OrderDto {
  @IsString()
  orderNumber: string;

  @IsString()
  date: string;

  @IsNumber()
  total: number;
}
