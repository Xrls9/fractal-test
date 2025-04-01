// import { prisma } from "../../../prisma";
// import { OrderDto } from "../dtos/Order.dto";

// export class OrderService {
//   static async find() {
//     const orders = await prisma.order.findMany({
//       where: {
//         deleteAt: null,
//       },
//     });
//     return orders;
//   }

//   static async findOne(orderId: number) {
//     const order = await prisma.order.findFirst({
//       where: {
//         deleteAt: null,
//         id: orderId,
//       },
//     });
//     return order;
//   }

//   static async create(data: OrderDto) {
//     const order = await prisma.order.create({
//       data: {
//         name: data.name,
//         price: +data.price,
//       },
//     });
//     return order;
//   }

//   static async update(data: OrderDto, orderId: number) {
//     const order = await prisma.order.update({
//       data: {
//         name: data.name,
//         price: +data.price,
//       },
//       where: {
//         id: orderId,
//       },
//     });
//     return order;
//   }

//   static async delete(orderId: number) {
//     const order = await prisma.order.update({
//       data: {
//         deleteAt: new Date(),
//       },
//       where: {
//         id: orderId,
//       },
//     });

//     return order;
//   }
// }
