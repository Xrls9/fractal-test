import React from "react";
import ActionButtons from "../../../shared/molecules/ActionButtons";

interface Product {
  id: number;
  name: string;
  price: number;
}

interface ProductRowProps {
  product: Product;
  onEdit: (product: Product) => void;
  onDelete: (productId: number) => void;
}

const ProductRow: React.FC<ProductRowProps> = ({
  product,
  onEdit,
  onDelete,
}) => {
  const options = [
    {
      label: "Editar",
      action: () => onEdit(product),
      className: "!bg-yellow-500 hover:!bg-yellow-700",
    },
    {
      label: "Eliminar",
      action: () => onDelete(product.id),
      className: "!bg-red-500 hover:!bg-red-700",
    },
  ];

  return (
    <tr className="border-b border-gray-100 hover:bg-gray-800">
      <td className="py-3 px-6 text-left">{product.name}</td>
      <td className="py-3 px-6 text-left">{product.price}</td>
      <td>
        <ActionButtons options={options} className="py-3 px-6 text-center" />
      </td>
    </tr>
  );
};

export default ProductRow;
