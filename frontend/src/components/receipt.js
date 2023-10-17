import moment from "moment";
import React from "react";
import { BiPhoneCall } from "react-icons/bi";
import { TbTruckDelivery } from "react-icons/tb";
import { useSelector } from "react-redux";
import { Document, Page, Text, View } from "@react-pdf/renderer";

const PdfReceipt = ({ data, subTotals }) => {
  console.log("data", data);
  return (
    <Document>
      <Page>
        <View>
          <Text>Order Receipt</Text>
          <Receipt data={data} subTotals={subTotals} />
        </View>
      </Page>
    </Document>
  );
};

const Receipt = ({ data, subTotals }) => {
  const { user, isAuthenticated } = useSelector((state) => state.user);
  return (
    <div className="receipt">
      <h1>Order Receipt</h1>
      <p>Order No: {data?._id.replace(/\D/g, "").slice(0, 10)}</p>
      <p>
        Placed on: {moment(data?.createdAt).format("MMMM Do YYYY, h:mm:ss a")}
      </p>

      <div className="cart-items">
        {data?.cart.map((item, index) => (
          <div key={index} className="cart-item">
            <img src={item.images[0]?.url} alt={item.name} />
            <div className="item-details">
              <h3>{item.name}</h3>
              {item.size && <p>Size: {item.size}</p>}
              <p>
                Price: Ksh. {item.discountPrice} x {item.qty}
              </p>
              <p>Total: Ksh. {item.discountPrice * item.qty}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="summary">
        <h2>Summary</h2>
        <div className="summary-item">
          <p>Subtotal</p>
          <p>Ksh. {subTotals}</p>
        </div>
        {data?.discount && (
          <div className="summary-item">
            <p>
              Discount <span className="exclusive-label">exclusive</span>
            </p>
            <p>Ksh. {data.discount}</p>
          </div>
        )}
        <div className="summary-item">
          <p>Shipping</p>
          <p>Ksh. {data?.shippingPrice}</p>
        </div>
        <div className="total">
          <p>Total</p>
          <p>Ksh. {Math.round(data?.totalPrice)}</p>
        </div>
      </div>

      <div className="shipping">
        <h2>Shipping</h2>
        <div className="shipping-option">
          <div className="delivery-icon">
            <TbTruckDelivery size={45} />
          </div>
          <div className="delivery-details">
            <p>Normal Delivery</p>
            <p>Delivery within 24 Hours</p>
          </div>
          <p>Ksh. {data?.shippingPrice}</p>
        </div>
      </div>

      <div className="customer">
        <h2>Customer</h2>
        <div className="customer-info">
          {/* <div className="customer-avatar">
            <img src={user.avatar?.url} alt={data?.user.name} />
          </div> */}
          <div className="customer-details">
            <p>{data?.user.name}</p>
            <p>Thanks-for-Shopping-with-Us!</p>
          </div>
        </div>
        <div className="contact-info">
          <div className="email">
            <img
              src="https://tuk-cdn.s3.amazonaws.com/can-uploader/order-summary-3-svg1.svg"
              alt="email"
            />
            <p>{data?.user.email}</p>
          </div>
          <div className="phone">
            <BiPhoneCall size={25} />
            <p>{data?.user.phoneNumber}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PdfReceipt;
