import React, { useState } from "react";
import { Product } from "./ProductTable";

interface ProductFormProps {
  product: Product;
  setProduct: React.Dispatch<React.SetStateAction<Product>>;
  onSubmit: () => void;
  onCancel: () => void;
}

const ProductForm: React.FC<ProductFormProps> = ({
  product,
  setProduct,
  onSubmit,
  onCancel,
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProduct((prevProduct) => ({
      ...prevProduct,
      [name]: name === "price" ? parseFloat(value) : value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit();
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="name">Nombre</label>
        <input
          id="name"
          name="name"
          type="text"
          className="form-control"
          value={product.name}
          onChange={handleChange}
        />
      </div>
      <div className="form-group">
        <label htmlFor="price">Precio</label>
        <input
          id="price"
          name="price"
          type="number"
          className="form-control"
          value={product.price}
          onChange={handleChange}
        />
      </div>

      <button type="submit" className="btn btn-primary">
        {product.id === 0 ? "Crear Producto" : "Actualizar Producto"}
      </button>
      <button
        type="button"
        className="btn btn-secondary ml-2"
        onClick={onCancel}
      >
        Cancelar
      </button>
    </form>
  );
};

export default ProductForm;
