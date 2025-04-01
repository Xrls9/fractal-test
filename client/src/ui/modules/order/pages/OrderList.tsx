import React, { useState, useEffect } from "react";
import { Order } from "../organisms/OrderTable";
import ConfirmationModal from "../../../shared/molecules/ConfirmationModal";
import useNavigation from "../../../../core/services/navigationService";
import OrderTable from "../organisms/OrderTable";

const OrderList: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([]);

  const [loading, setLoading] = useState<boolean>(true);

  const [showConfirmation, setShowConfirmation] = useState<boolean>(false);

  const [selectedOrderId, setSelectedOrderId] = useState<number>(0);

  const { goTo } = useNavigation();

  const fetchOrders = async () => {
    try {
      const response = await fetch("http://localhost:3000/api/orders");
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
      const response = await fetch(
        `http://localhost:3000/api/orders/${selectedOrderId}`,
        {
          method: "DELETE",
        }
      );
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
        <h1>My Orders</h1>
        <button
          onClick={() => goTo(`/orders/new`)}
          className="btn btn-primary mb-3"
        >
          New
        </button>
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
            message="¿Estás seguro de que quieres eliminar esta orden?"
            onAccept={() => handleDelete()}
            onCancel={() => setShowConfirmation(false)}
          />
        </div>
      )}
    </div>
  );
};

export default OrderList;
