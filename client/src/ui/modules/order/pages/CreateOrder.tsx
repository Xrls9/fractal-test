import React, { useState, useEffect } from "react";

import Button from "../../../shared/atoms/Button";
import useNavigation from "../../../../core/services/navigationService";
import { useParams } from "react-router-dom";
import AlertModal from "../../../shared/molecules/AlertModal";
import { url } from "../../../../core/services/apiConnection";
import Select from "../../../shared/molecules/Select";
import { Order } from "../../../../core/templates/order";
import { Product } from "../../../../core/templates/product";
import ProductOrderTable from "../organisms/ProductOrderTable";
import Input from "../../../shared/atoms/Input";

const CreateOrder: React.FC = () => {
  const { goTo } = useNavigation();

  const { orderId } = useParams();

  const today = new Date();

  const [showAlert, setShowAlert] = useState<boolean>(false);
  const [showModal, setShowModal] = useState<boolean>(false);

  const [productList, setProductList] = useState<Product[]>([]);

  const [selectedProduct, setSelectedProduct] = useState({
    quantity: 0,
    id: 0,
  });

  const [order, setOrder] = useState<Order>({
    id: 0,
    orderNumber: "",
    amount: 0,
    date: today.toLocaleDateString(),
    productsQty: 0,
    orderProducts: [],
  });

  const [alert, setAlert] = useState<{
    message: string;
    action: () => void;
  }>({ message: "", action: () => {} });

  useEffect(() => {
    if (orderId) fetchOrder();
    getProductList();
  }, []);

  const getProductList = async () => {
    try {
      const response = await fetch(`${url}/products`);
      if (response.ok) {
        const data = await response.json();

        setProductList(data);
      }
    } catch (err) {
      console.log("err :>> ", err);
    }
  };

  const fetchOrder = async () => {
    try {
      const response = await fetch(`${url}/orders/${orderId}`);

      if (response.ok) {
        const data = await response.json();
        const date = new Date(data.date).toLocaleDateString();

        setOrder({ ...data, date });
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleCreateOrder = async () => {
    try {
      const response = await fetch(`${url}/orders`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(order),
      });

      if (!response.ok) {
        setAlert({
          message: "Order was not registered",
          action: () => setShowAlert(false),
        });

        setShowAlert(true);
        return;
      }
      setAlert({
        message: "Order registered",
        action: () => goTo("/orders"),
      });
      setShowAlert(true);
    } catch (err) {
      console.log("err :>> ", err);
    }
  };

  const handleEditOrder = async () => {
    try {
      const response = await fetch(`${url}/orders/${order.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(order),
      });

      if (!response.ok) {
        setAlert({
          message: "Order was not updated",
          action: () => setShowAlert(false),
        });
        setShowAlert(true);
        return;
      }
      setAlert({ message: "Order registered", action: () => goTo("/orders") });
      setShowAlert(true);
    } catch (err) {
      console.log("err :>> ", err);
    }
  };

  const handleDeleteOrderProduct = (productId: number) => {
    const products = order.orderProducts.filter(
      (p) => p.productId !== productId
    );
    order.orderProducts = products;
    calcTotals();
  };

  const onSubmit = async () => {
    if (order.id) {
      handleEditOrder();
      return;
    }
    handleCreateOrder();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setOrder((prevOrder) => ({
      ...prevOrder,
      [name]: name === "amount" ? parseFloat(value) : value,
    }));
  };

  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setSelectedProduct((prevProduct) => ({
      ...prevProduct,
      [name]: name === "quantity" ? parseFloat(value) : value,
    }));
  };

  const handleSelect = (id: number) => {
    setSelectedProduct({ quantity: 0, id });
  };

  const calcTotals = () => {
    const totalAmount = order.orderProducts.reduce((acc, item) => {
      return acc + item.total;
    }, 0);
    setOrder((prevOrder) => ({
      ...prevOrder,
      productsQty: order.orderProducts.length,
      amount: totalAmount,
    }));
  };

  const handleProductSelect = () => {
    const product = productList.find((p) => p.id === selectedProduct.id);
    order.orderProducts.push({
      id: 0,
      name: product ? product.name : "",
      productId: selectedProduct.id,
      quantity: selectedProduct.quantity,
      price: product ? product.price : 0,
      total: product ? product.price * selectedProduct.quantity : 0,
    });
    calcTotals();
    closeModal();
  };

  const closeModal = () => {
    setSelectedProduct({ quantity: 0, id: 0 });
    setShowModal(false);
  };

  return (
    <div className="w-full h-[100vh] p-[20px] flex justify-center items-start">
      <form className="flex flex-col justify-center w-[65vw] pt-[30px]">
        <div className="w-full text-center pb-[30px]">
          <h1>{order.id != 0 ? "Update Order" : "New Order"}</h1>
        </div>
        <div className="md:flex md:items-center mb-6 justify-between">
          <div className="">
            <label className="block font-bold md:text-right mb-1 md:mb-0 pr-4">
              Order #
            </label>
          </div>
          <div className="">
            <input
              name="orderNumber"
              className="border-2 border-gray-200 rounded w-full py-2 px-4 leading-tight focus:outline-none"
              type="text"
              value={order.orderNumber}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="md:flex md:items-center mb-6 justify-between">
          <div className="">
            <label className="block font-bold md:text-right mb-1 md:mb-0 pr-4">
              Date
            </label>
          </div>
          <div className="">
            <input
              name="date"
              className="border-2 border-gray-200 rounded w-full py-2 px-4 leading-tight focus:outline-none"
              type="text"
              value={order.date}
              disabled
            />
          </div>
        </div>

        <div className="md:flex md:items-center mb-6 justify-between">
          <div className="">
            <label className="block font-bold md:text-right mb-1 md:mb-0 pr-4">
              Products
            </label>
          </div>
          <div className="">
            <input
              name="productsCount"
              className="border-2 border-gray-200 rounded w-full py-2 px-4 leading-tight focus:outline-none"
              type="text"
              value={order.productsQty}
              disabled
            />
          </div>
        </div>

        <div className="md:flex md:items-center mb-6 justify-between">
          <div className="">
            <label className="block font-bold md:text-right mb-1 md:mb-0 pr-4">
              Final Price
            </label>
          </div>
          <div className="">
            <input
              name=""
              className="border-2 border-gray-200 rounded w-full py-2 px-4 leading-tight focus:outline-none"
              type="text"
              value={order.amount}
              disabled
            />
          </div>
        </div>

        <div className="md:flex md:items-center mb-6 justify-between">
          <div className="w-full"></div>
          <Button
            label="Add Products +"
            onClick={() => setShowModal(true)}
            className="text-bold"
          />
        </div>

        <ProductOrderTable
          orderProducts={order.orderProducts}
          onDeleteProduct={(productId) => {
            handleDeleteOrderProduct(productId);
          }}
          className="h-[300px]"
        />

        <div className="flex justify-around mt-[15px]">
          <Button
            label={order.id === 0 ? "Register" : "Update"}
            onClick={onSubmit}
            className="!bg-blue-500 hover:!bg-blue-700"
          />

          <Button
            label="Cancel"
            onClick={() => goTo("/orders")}
            className="!bg-red-500 hover:!bg-red-700"
          />
        </div>
      </form>
      {showAlert && (
        <AlertModal
          show={showAlert}
          message={alert.message}
          option={{
            action: alert.action,
            label: "Ok",
            className: "",
          }}
        ></AlertModal>
      )}
      {showModal && (
        <div
          className="fixed inset-0 flex bg-black/90 justify-center items-center"
          tabIndex={-1}
        >
          <div className="p-6 rounded-lg shadow-lg w-full max-w-md border">
            <div className="relative w-full  ">
              <p className="text-lg font-semibold text-center py-[10px]">
                Add Products
              </p>
              <Button
                label="X"
                onClick={closeModal}
                className="absolute right-0 top-0"
              />
            </div>

            <div className="mt-4">
              <label className="block mb-1">Product</label>
              <Select
                id=""
                name=""
                options={productList.map(
                  (product: { id: number; name: string; price: number }) => {
                    return {
                      label: product.name,
                      value: product.id,
                    };
                  }
                )}
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                handleSelect={handleSelect}
              />

              <label className="block mb-1">Quantity</label>
              <Input
                onChange={handleQuantityChange}
                value={selectedProduct.quantity}
                type="number"
                name="quantity"
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div className="flex justify-around mt-8">
              <Button
                label="Ok"
                onClick={handleProductSelect}
                className="!bg-blue-500 hover:!bg-blue-700"
              />

              <Button
                label="Cancel"
                onClick={closeModal}
                className="!bg-red-500 hover:!bg-red-700"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CreateOrder;
