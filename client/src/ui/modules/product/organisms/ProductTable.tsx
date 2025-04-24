import React from "react";
import ProductRow from "./ProductRow";
import { Product } from "../../../../core/templates/product";

export interface ProductTableProps {
  onDeleteProduct: (productId: number) => void;
  onEditProduct: (product: Product) => void;
  products: Product[];
}

const ProductTable: React.FC<ProductTableProps> = ({
  onDeleteProduct,
  onEditProduct,
  products,
}) => {
  return (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse rounded-lg overflow-hidden shadow-md border border-gray-200">
        <thead>
          <tr className="bg-gray-100 text-gray-600 uppercase text-sm leading-normal">
            <th className="py-3 px-6 text-left">Name</th>
            <th className="py-3 px-6 text-left">Price</th>
            <th className="py-3 px-6 text-center">Actions</th>
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
