import React from "react";
import ActionButtons from "../../../shared/molecules/ActionButtons";
import { Product } from "../../../../core/templates/product";

interface ProductRowProps {
  onDelete: (productId: number) => void;
  onEdit: (product: Product) => void;
  product: Product;
}

const ProductRow: React.FC<ProductRowProps> = ({
  onDelete,
  onEdit,
  product,
}) => {
  const options = [
    {
      label: "Edit",
      action: () => onEdit(product),
      className: "!bg-yellow-500 hover:!bg-yellow-700",
    },
    {
      label: "Delete",
      action: () => onDelete(product.id),
      className: "!bg-red-500 hover:!bg-red-700",
    },
  ];

  return (
    <tr className="border-b border-gray-100 hover:bg-gray-800">
      <td className="py-3 px-6 text-left">{product.name}</td>
      <td className="py-3 px-6 text-left">{product.price}</td>
      <td>
        <ActionButtons
          options={options}
          className="flex py-3 gap-[10px] justify-center"
        />
      </td>
    </tr>
  );
};

export default ProductRow;
