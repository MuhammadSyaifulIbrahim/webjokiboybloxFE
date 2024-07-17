import { useEffect, useState } from "react";
import { CardOrder } from "../checkout/card-checkout";
import { getOrder } from "../../Functions/API/fetchOrder";
import { useParams } from "react-router-dom";

export const Order = ({ user }) => {
  const [order, setOrder] = useState();

  const token = localStorage.getItem("token");

  if (!token) {
    window.alert("Anda perlu login terlebih dahulu! ");
    window.location.href = "/login";
  }

  if (user) {
    if (user?.role !== "USER") {
      window.location.href = "/";
    }
  }

  const { invoice } = useParams();

  useEffect(() => {
    const fetch = async () => {
      try {
        const response = await getOrder(invoice, token);
        setOrder(response?.data?.data?.order);
      } catch (error) {
        console.log(error);
        window.alert(error?.response?.data?.message);
        window.location.href = "/orders";
      }
    };
    fetch();
  }, []);
  return <>{order ? <CardOrder data={order} /> : <div className="min-vh-100"></div>}</>;
};
