import { prisma } from "../../../prisma";

export class OrderService {
  static async find() {
    const orders = await prisma.order.findMany({
      where: {
        deleteAt: null,
      },
    });
    return orders;
  }
}
