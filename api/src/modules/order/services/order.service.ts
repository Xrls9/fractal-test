import { PrismaClient } from "@prisma/client";
import { prisma } from "../../../prisma";
import { OrderDto } from "../dtos/Order.dto";
import { v4 as uuidv4 } from "uuid";

export class OrderService {
  static async find() {
    const orders = await prisma.order.findMany({
      where: {
        deleteAt: null,
      },
      include: {
        OrderProduct: {
          include: { product: true },
        },
      },
    });
    const result = orders.map((order) => {
      return { ...order, productsQty: order.OrderProduct.length };
    });
    return result;
  }

  static async findOne(orderId: number) {
    const order = await prisma.order.findFirst({
      where: {
        deleteAt: null,
        id: orderId,
      },
      include: {
        OrderProduct: {
          include: {
            product: true,
          },
        },
      },
    });

    const orderProds = order?.OrderProduct.map((item) => {
      return {
        ...item,
        name: item.product?.name,
        price: item.product?.price,
      };
    });

    return {
      ...order,
      productsQty: orderProds?.length,
      OrderProduct: orderProds,
    };
  }

  static async create(data: OrderDto) {
    const orderNumber =
      data.orderNumber == "" ? uuidv4().split("-")[0] : data.orderNumber;

    const result = await prisma.$transaction(async (prisma) => {
      const order = await prisma.order.create({
        data: {
          date: new Date(),
          total: data.total,
          orderNumber,
        },
      });

      await prisma.orderProduct.createMany({
        data: data.OrderProduct.map((orderProduct) => ({
          productId: orderProduct.productId,
          orderId: order.id,
          quantity: orderProduct.quantity,
          total: orderProduct.total,
        })),
      });

      const result = await prisma.order.findFirst({
        where: {
          id: order.id,
        },
        select: {
          id: true,
          date: true,
          orderNumber: true,
          total: true,
          OrderProduct: {
            select: { product: true, quantity: true, total: true, id: true },
          },
        },
      });
      return result;
    });

    return result;
  }

  static async update(data: OrderDto, orderId: number) {
    const result = await prisma.$transaction(async (prisma) => {
      const order = await prisma.order.update({
        data: {
          orderNumber: data.orderNumber,
        },
        where: {
          id: orderId,
        },
      });

      await prisma.orderProduct.deleteMany({
        where: { orderId: order.id },
      });

      await prisma.orderProduct.createMany({
        data: data.OrderProduct.map((orderProduct) => ({
          productId: orderProduct.productId,
          orderId: order.id,
          quantity: orderProduct.quantity,
          total: orderProduct.total,
        })),
      });

      const result = await prisma.order.findFirst({
        where: {
          id: order.id,
        },
        select: {
          id: true,
          date: true,
          orderNumber: true,
          total: true,
          OrderProduct: {
            select: { product: true, quantity: true, total: true, id: true },
          },
        },
      });
      return result;
    });
    return result;
  }

  static async delete(orderId: number) {
    const result = await prisma.$transaction(async (prisma) => {
      const order = await prisma.order.update({
        data: {
          deleteAt: new Date(),
        },
        where: {
          id: orderId,
        },
      });

      await prisma.orderProduct.deleteMany({
        where: { orderId: order.id },
      });
      return order;
    });

    return result;
  }
}
