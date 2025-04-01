import React from "react";
import ProductRow from "./ProductRow";

export interface Product {
  id: number;
  name: string;
  price: number;
}

export interface ProductTableProps {
  products: Product[];
  onEditProduct: (product: Product) => void;
  onDeleteProduct: (productId: number) => void;
}

const ProductTable: React.FC<ProductTableProps> = ({
  products,
  onEditProduct,
  onDeleteProduct,
}) => {
  return (
    <div>
      <table className="table">
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Precio</th>
            <th>Acciones</th>
          </tr>
        </thead>

        <tbody>
          {products.map((product) => (
            <ProductRow
              key={product.id}
              product={product}
              onEdit={onEditProduct}
              onDelete={onDeleteProduct}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProductTable;
