import React, { useState, useEffect } from "react";
import { Order } from "../organisms/OrderTable";
import Button from "../../../shared/atoms/Button";
import useNavigation from "../../../../core/services/navigationService";
import { useParams } from "react-router-dom";
import AlertModal from "../../../shared/molecules/AlertModal";

const CreateOrder: React.FC = () => {
  const { goTo } = useNavigation();

  const { orderId } = useParams();

  const today = new Date();

  const [showAlert, setShowAlert] = useState<boolean>(false);

  const [order, setOrder] = useState<Order>({
    id: 0,
    orderNumber: "",
    amount: 0,
    date: today.toLocaleDateString(),
    productsQty: 0,
  });

  const [alert, setAlert] = useState<{
    message: string;
    action: () => void;
  }>({ message: "", action: () => {} });

  useEffect(() => {
    if (orderId) fetchOrder();
  }, []);

  const fetchOrder = async () => {
    try {
      const response = await fetch(
        `http://localhost:3000/api/orders/${orderId}`
      );

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
      const response = await fetch("http://localhost:3000/api/orders", {
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
      const response = await fetch(
        `http://localhost:3000/api/orders/${order.id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(order),
        }
      );

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
              name="date"
              className="border-2 border-gray-200 rounded w-full py-2 px-4 leading-tight focus:outline-none"
              type="text"
              value={order.amount}
              disabled
            />
          </div>
        </div>

        <div className="flex justify-around ">
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
    </div>
  );
};

export default CreateOrder;
