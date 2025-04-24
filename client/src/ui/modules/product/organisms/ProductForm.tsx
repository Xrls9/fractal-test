import React from "react";

import Button from "../../../shared/atoms/Button";
import { Product } from "../../../../core/templates/product";

interface ProductFormProps {
  onCancel: VoidFunction;
  onSubmit: VoidFunction;
  product: Product;
  setProduct: React.Dispatch<React.SetStateAction<Product>>;
}

const ProductForm: React.FC<ProductFormProps> = ({
  onCancel,
  onSubmit,
  product,
  setProduct,
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProduct((prevProduct) => ({
      ...prevProduct,
      [name]: name === "price" ? parseFloat(value) : value,
    }));
  };

  return (
    <form>
      <div className="md:flex md:items-center mb-6 justify-between">
        <div className="">
          <label className="block font-bold md:text-right mb-1 md:mb-0 pr-4">
            Name
          </label>
        </div>
        <div className="">
          <input
            name="name"
            className="border-2 border-gray-200 rounded w-full py-2 px-4 leading-tight focus:outline-none"
            type="text"
            value={product.name}
            onChange={handleChange}
          />
        </div>
      </div>

      <div className="md:flex md:items-center mb-6 justify-between">
        <div className="">
          <label className="block font-bold md:text-right mb-1 md:mb-0 pr-4">
            Price
          </label>
        </div>
        <div className="">
          <input
            name="price"
            className="border-2 border-gray-200 rounded w-full py-2 px-4 leading-tight focus:outline-none"
            type="number"
            value={product.price}
            onChange={handleChange}
          />
        </div>
      </div>

      <div className="flex justify-around ">
        <Button
          label={product.id === 0 ? "Register" : "Update"}
          onClick={onSubmit}
          className="!bg-blue-500 hover:!bg-blue-700"
        />

        <Button
          label="Cancel"
          onClick={onCancel}
          className="!bg-red-500 hover:!bg-red-700"
        />
      </div>
    </form>
  );
};

export default ProductForm;
