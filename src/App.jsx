import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Home } from "./components/home/home";
import { MainTemplate } from "./components/templates/main-template.jsx";
import "./App.css";
import { Login } from "./components/auth/login.jsx";
import { Register } from "./components/auth/register.jsx";
import { Checkout } from "./components/checkout/checkout.jsx";
import { FindOrder } from "./components/orders/find-order.jsx";
import { Order } from "./components/orders/order.jsx";
import { AdminOrders } from "./components/admin/admin-orders.jsx";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainTemplate component={Home} />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/checkout" element={<MainTemplate component={Checkout} />} />
        <Route path="/orders" element={<MainTemplate component={FindOrder} />} />
        <Route path="/orders/:invoice" element={<MainTemplate component={Order} />} />
        <Route path="/admin/orders" element={<MainTemplate component={AdminOrders} />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
