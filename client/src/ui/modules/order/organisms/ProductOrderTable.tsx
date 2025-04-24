import React from "react";
import ProductOrderRow from "./ProductOrderRow";
import { OrderProduct } from "../../../../core/templates/order";

export interface OrderProductTableProps {
  className: string;
  onDeleteProduct: (productId: number) => void;
  orderProducts: OrderProduct[];
}

const ProductOrderTable: React.FC<OrderProductTableProps> = ({
  className = "",
  onDeleteProduct,
  orderProducts,
}) => {
  return (
    <div className={`overflow-x-auto ${className}`}>
      <table className="w-full border-collapse rounded-lg overflow-hidden shadow-md border border-gray-200">
        <thead>
          <tr className="bg-gray-100 text-gray-600 uppercase text-sm leading-normal">
            <th className="py-3 px-6 text-left">Name</th>
            <th className="py-3 px-6 text-left">Price</th>
            <th className="py-3 px-6 text-left">Quantity</th>
            <th className="py-3 px-6 text-left">Total</th>
            <th className="py-3 px-6 text-center">Actions</th>
          </tr>
        </thead>

        <tbody className="text-sm">
          {orderProducts.length > 0 &&
            orderProducts.map((productOrder) => (
              <ProductOrderRow
                key={productOrder.id}
                orderProduct={productOrder}
                onDelete={onDeleteProduct}
              />
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProductOrderTable;
