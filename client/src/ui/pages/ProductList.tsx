import React, { useState, useEffect } from "react";
import ProductTable from "../organisms/ProductTable";
import { Product } from "../organisms/ProductTable";
import Button from "../atoms/Button";
import ProductForm from "../organisms/ProductForm";

const ProductList: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const [newProduct, setNewProduct] = useState<Product>({
    id: 0,
    name: "",
    price: 0,
  });

  const [showModal, setShowModal] = useState<boolean>(false);
  const [isEdit, setIsEdit] = useState<boolean>(false);

  const fetchProducts = async () => {
    try {
      const response = await fetch("http://localhost:3000/api/products");
      if (!response.ok) {
        throw new Error("No se pudieron obtener los productos");
      }
      const data = await response.json();
      setProducts(data);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleCreateProduct = async () => {
    try {
      const response = await fetch("http://localhost:3000/api/products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newProduct),
      });
      if (response.ok) {
        fetchProducts();
      } else {
        console.log("No se pudo listar los productos");
      }
    } catch (err) {
      console.log("err :>> ", err);
    }
  };

  const handleEditProduct = async (productId: number) => {
    console.log("Editando producto:", newProduct);
  };

  const handleDelete = async (productId: number) => {
    try {
      const response = await fetch(
        `http://localhost:3000/api/products/${productId}`,
        {
          method: "DELETE",
        }
      );
      if (response.ok) {
        fetchProducts();
      } else {
        console.log("err :>> ", "No se pudo obtener la lista de productos");
      }
    } catch (err) {
      console.log("err :>> ", err);
    }
  };

  const openModal = (product?: Product) => {
    if (product) {
      setIsEdit(true);
      setNewProduct(product);
    } else {
      setIsEdit(false);
      setNewProduct({ id: 0, name: "", price: 0 });
    }
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  if (loading) {
    return <div>Cargando productos...</div>;
  }

  return (
    <div>
      <h1>Lista de Productos</h1>
      <button onClick={() => openModal()} className="btn btn-primary mb-3">
        Crear Producto
      </button>

      <ProductTable
        products={products}
        onEditProduct={openModal}
        onDeleteProduct={handleDelete}
      />

      {showModal && (
        <div className="modal show" tabIndex={-1} style={{ display: "block" }}>
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <p className="modal-title">
                  {isEdit ? "Editar Producto" : "Crear Producto"}
                </p>
                <button type="button" className="close" onClick={closeModal}>
                  <span>&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <ProductForm
                  product={newProduct}
                  setProduct={setNewProduct}
                  onSubmit={isEdit ? handleEditProduct : handleCreateProduct}
                  onCancel={closeModal}
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductList;
