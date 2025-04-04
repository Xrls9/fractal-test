import React from "react";
import ActionButtons from "../../../shared/molecules/ActionButtons";
import { OrderProduct } from "../../../../core/templates/order";

interface OrderProductRowProps {
  orderProduct: OrderProduct;
  onDelete: (productId: number) => void;
}

const OrderProductRow: React.FC<OrderProductRowProps> = ({
  orderProduct,
  onDelete,
}) => {
  const options = [
    {
      label: "Delete",
      action: () => onDelete(orderProduct.productId),
      className: "!bg-red-500 hover:!bg-red-700",
    },
  ];

  return (
    <tr className="border-b border-gray-100 hover:bg-gray-800">
      <td className="py-3 px-6 text-left">{orderProduct.name}</td>
      <td className="py-3 px-6 text-left">{orderProduct.price}</td>
      <td className="py-3 px-6 text-left">{orderProduct.quantity}</td>
      <td className="py-3 px-6 text-left">{orderProduct.total}</td>
      <td>
        <ActionButtons
          options={options}
          className="flex py-3 gap-[10px] justify-center"
        />
      </td>
    </tr>
  );
};

export default OrderProductRow;
