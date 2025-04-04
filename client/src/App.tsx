import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ProductList from "./ui/modules/product/pages/ProductList";
import OrderList from "./ui/modules/order/pages/OrderList";
import CreateOrder from "./ui/modules/order/pages/CreateOrder";
import Home from "./ui/modules/layout/pages/home";

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<ProductList />} />
        <Route path="/orders" element={<OrderList />} />
        <Route path="/orders/new" element={<CreateOrder />} />
        <Route path="/orders/:orderId" element={<CreateOrder />} />
      </Routes>
    </Router>
  );
};

export default App;
