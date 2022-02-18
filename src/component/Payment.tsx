import Stripe from "react-stripe-checkout";
import axios from "axios";
import "./Payment.css";
import React, { useState } from 'react';



function Payment() {
  const [totalAmount, setTotalAmount] = useState(0);
  
  async function handleToken(token) {
    console.log(JSON.stringify(token));
    console.log(token.id);
    console.log(JSON.stringify(token.card.id));
    await axios.post("http://localhost:8080/payment/charge", "", {
      headers: {
        token: token.id,
        amount: totalAmount,
      }

      ,
    }).then(() => {
      alert("Payment Success");
    }).catch((error) => {
      alert(error);
    });
  }
  return (
    <>
    <div className="donationHeader">Enter the donation amount</div>
      <div className="amount">
          <input type="text" name="amount" onChange={e =>setTotalAmount(e.target.value)}/>
      </div>
      <div className="payment">
        <Stripe
          name="Naville Alumni Association"
          description="Donate Money"
          panelLabel="Donate Now"
          ComponentClass="edit"
          billingAddress={true}
          image="https://www.nevillealumni.org/sites/default/files/nafa_logo_108x114_1.png"
          stripeKey="pk_test_51KTBqNJCsBkQnwT7z2KEfRRafm2mIQWSL2tuekmlD6kpHznIPsFXBbz5iooy4AajyO9LdYdvO7LLg0ICACezlX2G00mL9R7QwH"
          token={handleToken}
        />
      </div>
    </>
  );
}
export default Payment;