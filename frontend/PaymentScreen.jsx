import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./payment-screen.css";

const PaymentScreen = () => {
  const [paymentMethod, setPaymentMethod] = useState("");
  const [paymentInfo, setPaymentInfo] = useState({});
  const navigate = useNavigate();

  const handlePaymentInput = (e) => {
    setPaymentInfo({ ...paymentInfo, [e.target.name]: e.target.value });
  };

  const handleConfirm = () => {
    if (
      (paymentMethod === "gpay" && paymentInfo.upi) ||
      (paymentMethod === "card" &&
        paymentInfo.cardNumber &&
        paymentInfo.cardName &&
        paymentInfo.expiry &&
        paymentInfo.cvv)
    ) {
      navigate("/success");
    } else {
      alert("Please complete payment details.");
    }
  };

  return (
    <div className="payment-container">
      <h2>Select a Payment Method</h2>
      <div className="payment-options">
        <button onClick={() => setPaymentMethod("gpay")}>🟢 GPay</button>
        <button onClick={() => setPaymentMethod("card")}>💳 Debit Card</button>
      </div>

      {paymentMethod === "gpay" && (
        <div className="payment-form">
          <h3>Enter GPay UPI or Mobile Number</h3>
          <input
            type="text"
            name="upi"
            placeholder="e.g. yourname@upi / 9876543210"
            onChange={handlePaymentInput}
          />
        </div>
      )}

      {paymentMethod === "card" && (
        <div className="payment-form">
          <h3>Enter Card Details</h3>
          <input
            type="text"
            name="cardNumber"
            placeholder="Card Number"
            onChange={handlePaymentInput}
          />
          <input
            type="text"
            name="cardName"
            placeholder="Cardholder Name"
            onChange={handlePaymentInput}
          />
          <input
            type="text"
            name="expiry"
            placeholder="MM/YY"
            onChange={handlePaymentInput}
          />
          <input
            type="password"
            name="cvv"
            placeholder="CVV"
            onChange={handlePaymentInput}
          />
        </div>
      )}

      {paymentMethod && (
        <button className="confirm-btn" onClick={handleConfirm}>
          Confirm & Pay
        </button>
      )}
    </div>
  );
};

export default PaymentScreen;
