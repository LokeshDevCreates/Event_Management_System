import React from 'react';
import { Routes, Route } from 'react-router-dom';
import './App.css';
import UserEventBooking from './UserEventBooking';
import BookingForm from './BookingForm';
import PaymentScreen from './PaymentScreen';
import SuccessCelebration from './SuccessCelebration';

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<UserEventBooking />} />
      <Route path="/booking" element={<BookingForm />} />
      <Route path="/payment" element={<PaymentScreen />} />
      <Route path="/success" element={<SuccessCelebration />} />
    </Routes>
  );
};

export default App;
