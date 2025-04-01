import React from "react";
import ActionButtons from "../../../shared/molecules/ActionButtons";

interface Order {
  id: number | null;
  code: string;
  date: string;
  productsQty: number;
  amount: number;
}

interface OrderRowProps {
  order: Order;
  onEdit: (orderId: number) => void;
  onDelete: (orderId: number) => void;
}

const OrderRow: React.FC<OrderRowProps> = ({ order, onEdit, onDelete }) => {
  const options = [
    {
      label: "Editar",
      action: () => onEdit(order.id),
      className: "!bg-yellow-500 hover:!bg-yellow-700",
    },
    {
      label: "Eliminar",
      action: () => onDelete(order.id),
      className: "!bg-red-500 hover:!bg-red-700",
    },
  ];

  return (
    <tr className="border-b border-gray-100 hover:bg-gray-800">
      <td className="py-3 px-6 text-left">{order.id}</td>
      <td className="py-3 px-6 text-left">{order.code}</td>
      <td className="py-3 px-6 text-left">{order.date}</td>
      <td className="py-3 px-6 text-left">{order.productsQty}</td>
      <td className="py-3 px-6 text-left">{order.amount}</td>
      <td>
        <ActionButtons options={options} className="py-3 px-6 text-center" />
      </td>
    </tr>
  );
};

export default OrderRow;
