import React, { useState, useEffect } from "react";
import ProductTable from "../organisms/ProductTable";

import ProductForm from "../organisms/ProductForm";

import ConfirmationModal from "../../../shared/molecules/ConfirmationModal";
import { url } from "../../../../core/services/apiConnection";
import Button from "../../../shared/atoms/Button";
import useNavigation from "../../../../core/services/navigationService";
import { Product } from "../../../../core/templates/product";

const ProductList: React.FC = () => {
  const { goTo } = useNavigation();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const [newProduct, setNewProduct] = useState<Product>({
    id: 0,
    name: "",
    price: 0,
  });

  const [showModal, setShowModal] = useState<boolean>(false);

  const [showConfirmation, setShowConfirmation] = useState<boolean>(false);

  const [isEdit, setIsEdit] = useState<boolean>(false);

  const [selectedProductId, setSelectedProductId] = useState<number | null>(
    null
  );

  const fetchProducts = async () => {
    try {
      const response = await fetch(`${url}/products`);
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
      const response = await fetch(`${url}/products`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newProduct),
      });
      if (!response.ok) {
        console.log("No se pudo listar los productos");
        return;
      }

      fetchProducts();
      closeModal();
    } catch (err) {
      console.log("err :>> ", err);
    }
  };

  const handleEditProduct = async () => {
    try {
      const response = await fetch(`${url}/products/${newProduct.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newProduct),
      });
      if (!response.ok) {
        console.log("No se pudo listar los productos");
        return;
      }

      fetchProducts();
      closeModal();
    } catch (error) {
      console.log("error :>> ", error);
    }
  };

  const handleDelete = async () => {
    if (selectedProductId === null) return;
    try {
      const response = await fetch(`${url}/products/${selectedProductId}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        console.log("No se pudo listar los productos");
        return;
      }

      setShowConfirmation(false);
      fetchProducts();
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
    <div className="w-full h-[100vh] p-[20px]">
      <div className="flex flex-column justify-between pb-[25px]">
        <div className="flex gap-[15px] items-center">
          <Button
            label="&larr;"
            onClick={() => goTo(`/`)}
            className="btn btn-primary !rounded-[50%] !py-[15px] size-fit"
          />
          <h1>Products List</h1>
        </div>

        <Button
          label="New"
          onClick={() => openModal()}
          className="btn btn-primary !bg-blue-500"
        />
      </div>

      <ProductTable
        products={products}
        onEditProduct={openModal}
        onDeleteProduct={(productId) => {
          setSelectedProductId(productId);
          setShowConfirmation(true);
        }}
      />

      {showModal && (
        <div
          className="fixed inset-0 flex bg-black/90 justify-center items-center"
          tabIndex={-1}
        >
          <div className="p-6 rounded-lg shadow-lg w-full max-w-md border">
            <div className="relative w-full  ">
              <p className="text-lg font-semibold text-center py-[10px]">
                {isEdit ? "Edit Product" : "Register Product"}
              </p>
              <Button
                label="X"
                onClick={closeModal}
                className="absolute right-0 top-0"
              />
            </div>

            <div className="mt-4">
              <ProductForm
                product={newProduct}
                setProduct={setNewProduct}
                onSubmit={isEdit ? handleEditProduct : handleCreateProduct}
                onCancel={closeModal}
              />
            </div>
          </div>
        </div>
      )}

      {showConfirmation && (
        <div className="flex justify-center mt-10">
          <ConfirmationModal
            show={showConfirmation}
            message="¿Estás seguro de que quieres eliminar este producto?"
            onAccept={() => handleDelete()}
            onCancel={() => setShowConfirmation(false)}
          />
        </div>
      )}
    </div>
  );
};

export default ProductList;
