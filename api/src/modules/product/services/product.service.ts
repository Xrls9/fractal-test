import { prisma } from "../../../prisma";
import { ProductDto } from "../dtos/Product.dto";

export class ProductService {
  static async find() {
    const orders = await prisma.product.findMany({
      where: {
        deleteAt: null,
      },
    });
    return orders;
  }

  static async findOne(productId: number) {
    const product = await prisma.product.findFirst({
      where: {
        deleteAt: null,
        id: productId,
      },
    });
    return product;
  }

  static async create(data: ProductDto) {
    const product = await prisma.product.create({
      data: {
        name: data.name,
        price: +data.price,
      },
    });
    return product;
  }

  static async update(data: ProductDto, productId: number) {
    const product = await prisma.product.update({
      data: {
        name: data.name,
        price: +data.price,
      },
      where: {
        id: productId,
      },
    });
    return product;
  }

  static async delete(productId: number) {
    const product = await prisma.product.update({
      data: {
        deleteAt: new Date(),
      },
      where: {
        id: productId,
      },
    });

    return product;
  }
}
