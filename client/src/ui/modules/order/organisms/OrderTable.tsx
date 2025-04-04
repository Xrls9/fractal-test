import React from "react";

import OrderRow from "./OrderRow";
import { Order } from "../../../../core/templates/order";

export interface OrderTableProps {
  orders: Order[];
  onEditOrder: (orderId: number) => void;
  onDeleteOrder: (orderId: number) => void;
}

const OrderTable: React.FC<OrderTableProps> = ({
  orders,
  onEditOrder,
  onDeleteOrder,
}) => {
  return (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse rounded-lg overflow-hidden shadow-md border border-gray-200">
        <thead>
          <tr className="bg-gray-100 text-gray-600 uppercase text-sm leading-normal">
            <th className="py-3 px-6 text-center">Id</th>
            <th className="py-3 px-6 text-center">Order #</th>
            <th className="py-3 px-6 text-center">Date</th>
            <th className="py-3 px-6 text-center">Products Qty</th>
            <th className="py-3 px-6 text-center">Final Price</th>
            <th className="py-3 px-6 text-center">Options</th>
          </tr>
        </thead>

        <tbody className="text-sm">
          {orders.map((order) => (
            <OrderRow
              key={order.id}
              order={order}
              onEdit={onEditOrder}
              onDelete={onDeleteOrder}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default OrderTable;
