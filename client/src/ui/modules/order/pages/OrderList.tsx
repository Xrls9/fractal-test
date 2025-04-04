import React, { useState, useEffect } from "react";
import ConfirmationModal from "../../../shared/molecules/ConfirmationModal";
import useNavigation from "../../../../core/services/navigationService";
import OrderTable from "../organisms/OrderTable";
import { url } from "../../../../core/services/apiConnection";
import Button from "../../../shared/atoms/Button";
import { Order } from "../../../../core/templates/order";

const OrderList: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([]);

  const [loading, setLoading] = useState<boolean>(true);

  const [showConfirmation, setShowConfirmation] = useState<boolean>(false);

  const [selectedOrderId, setSelectedOrderId] = useState<number>(0);

  const { goTo } = useNavigation();

  const fetchOrders = async () => {
    try {
      const response = await fetch(`${url}/orders`);
      if (!response.ok) {
        throw new Error("Orders couldn't be displayed");
      }
      const data = await response.json();
      setOrders(data);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const handleDelete = async () => {
    if (selectedOrderId === null) return;
    try {
      const response = await fetch(`${url}/orders/${selectedOrderId}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        console.log("Order not deleted");
        return;
      }

      setShowConfirmation(false);
      fetchOrders();
    } catch (err) {
      console.log("err :>> ", err);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
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
          <h1>My Orders</h1>
        </div>

        <Button
          label="New"
          onClick={() => goTo(`/orders/new`)}
          className="btn btn-primary !bg-blue-500"
        />
      </div>

      <OrderTable
        orders={orders}
        onEditOrder={(orderId) => {
          goTo(`/orders/${orderId}`);
        }}
        onDeleteOrder={(orderId) => {
          setSelectedOrderId(orderId);
          setShowConfirmation(true);
        }}
      />

      {showConfirmation && (
        <div className="flex justify-center mt-10">
          <ConfirmationModal
            show={showConfirmation}
            message="Are you sure you want to delete this order?"
            onAccept={() => handleDelete()}
            onCancel={() => setShowConfirmation(false)}
          />
        </div>
      )}
    </div>
  );
};

export default OrderList;
