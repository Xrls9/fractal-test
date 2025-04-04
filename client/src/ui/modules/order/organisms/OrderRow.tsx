import React from "react";
import ActionButtons from "../../../shared/molecules/ActionButtons";
import { Order } from "../../../../core/templates/order";

interface OrderRowProps {
  order: Order;
  onEdit: (orderId: number) => void;
  onDelete: (orderId: number) => void;
}

const OrderRow: React.FC<OrderRowProps> = ({ order, onEdit, onDelete }) => {
  const options = [
    {
      label: "Edit",
      action: () => onEdit(order.id),
      className: "!bg-yellow-500 hover:!bg-yellow-600",
    },
    {
      label: "Delete",
      action: () => onDelete(order.id),
      className: "!bg-red-500 hover:!bg-red-700",
    },
  ];

  const date = new Date(order.date).toLocaleDateString();

  return (
    <tr className="border-b border-gray-100 hover:bg-gray-800">
      <td className="py-3 px-6 text-center">{order.id}</td>
      <td className="py-3 px-6 text-center">{order.orderNumber}</td>
      <td className="py-3 px-6 text-center">{date}</td>
      <td className="py-3 px-6 text-center">{order.productsQty}</td>
      <td className="py-3 px-6 text-center">{order.total}</td>
      <td>
        <ActionButtons
          options={options}
          className="flex py-3 gap-[10px] justify-center"
        />
      </td>
    </tr>
  );
};

export default OrderRow;
