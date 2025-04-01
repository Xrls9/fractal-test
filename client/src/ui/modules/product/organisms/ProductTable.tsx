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
    <div className="overflow-x-auto">
      <table className="w-full border-collapse rounded-lg overflow-hidden shadow-md border border-gray-200">
        <thead>
          <tr className="bg-gray-100 text-gray-600 uppercase text-sm leading-normal">
            <th className="py-3 px-6 text-left">Nombre</th>
            <th className="py-3 px-6 text-left">Precio</th>
            <th className="py-3 px-6 text-center">Acciones</th>
          </tr>
        </thead>

        <tbody className="text-sm">
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
