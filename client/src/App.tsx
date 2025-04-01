import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ProductList from "./ui/pages/ProductList";

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/products" element={<ProductList />} />
      </Routes>
    </Router>
  );
};

export default App;
