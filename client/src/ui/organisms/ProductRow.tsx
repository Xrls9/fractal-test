import React from "react";
import ActionButtons from "../molecules/ActionButtons";
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
    { label: "Editar", action: () => onEdit(product) },
    { label: "Eliminar", action: () => onDelete(product.id) },
  ];

  return (
    <tr>
      <td>{product.name}</td>
      <td>{product.price}</td>
      <ActionButtons options={options} />
    </tr>
  );
};

export default ProductRow;
