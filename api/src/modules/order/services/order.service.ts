import { prisma } from "../../../prisma";
import { OrderDto } from "../dtos/Order.dto";
import { v4 as uuidv4 } from "uuid";

export class OrderService {
  static async find() {
    const orders = await prisma.order.findMany({
      where: {
        deleteAt: null,
      },
    });
    return orders;
  }

  static async findOne(orderId: number) {
    const order = await prisma.order.findFirst({
      where: {
        deleteAt: null,
        id: orderId,
      },
    });

    return order;
  }

  static async create(data: OrderDto) {
    const orderNumber =
      data.orderNumber == "" ? uuidv4().split("-")[0] : data.orderNumber;
    const order = await prisma.order.create({
      data: {
        date: new Date(),
        total: 0,
        orderNumber,
      },
    });
    return order;
  }

  static async update(data: OrderDto, orderId: number) {
    const order = await prisma.order.update({
      data: {
        orderNumber: data.orderNumber,
      },
      where: {
        id: orderId,
      },
    });
    return order;
  }

  static async delete(orderId: number) {
    const order = await prisma.order.update({
      data: {
        deleteAt: new Date(),
      },
      where: {
        id: orderId,
      },
    });

    return order;
  }
}
