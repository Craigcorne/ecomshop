import React, { useEffect } from "react";
import Header from "../components/Layout/Header";
import CheckoutSteps from "../components/Checkout/CheckoutSteps";
import Checkout from "../components/Checkout/Checkout";
import Footer from "../components/Layout/Footer";
import Meta from "../components/Meta";
import { useNavigate } from "react-router-dom";

const CheckoutPage = ({ guestOrder }) => {
  // Add an effect to check if it's a guest order and redirect accordingly

  return (
    <div>
      <Meta title="Checkout" />

      <Header />
      <br />
      <br />
      <CheckoutSteps active={1} />
      <Checkout />
      <br />
      <br />
      <Footer />
    </div>
  );
};

export default CheckoutPage;
