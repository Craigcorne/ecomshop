import axios from "axios";
import React, { useEffect } from "react";
import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { server } from "../server";
import Meta from "../components/Meta";
import Footer from "../components/Layout/Footer";
import Header from "../components/Layout/Header";

const SellerActivationPage = () => {
  const { activation_token } = useParams();
  const [error, setError] = useState(false);

  useEffect(() => {
    if (activation_token) {
      const sendRequest = async () => {
        await axios
          .post(`${server}/shop/activation`, {
            activation_token,
          })
          .then((res) => {
            console.log(res);
          })
          .catch((err) => {
            setError(true);
          });
      };
      sendRequest();
    }
  }, []);

  return (
    <>
      <Header />

      <div
        style={{
          width: "100%",
          height: "60vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Meta title="Seller Activation" />

        {error ? (
          <>
            <div>
              <p>Your token has already expired!</p>
              <br />
              <Link
                to="/shop-create"
                className="group mt-2 relative h-[40px] flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
              >
                Back to Create Account
              </Link>
            </div>
          </>
        ) : (
          <>
            <div>
              <p>Your account has been created suceessfully!</p>
              <br />
              <Link
                to="/shop-login"
                className="group mt-2 relative h-[40px] flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
              >
                Login Now
              </Link>
            </div>
          </>
        )}
      </div>
      <Footer />
    </>
  );
};

export default SellerActivationPage;
