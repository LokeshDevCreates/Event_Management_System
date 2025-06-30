import React from 'react';
import { Routes, Route } from 'react-router-dom';
import './App.css';

import UserEventBooking from './UserEventBooking';
import BookingForm from './BookingForm';
import PaymentScreen from './PaymentScreen';
import SuccessCelebration from './SuccessCelebration';
import MiniChatbot from './MiniChatbot';
import { EventProvider } from './EventContext'; // ← ✅ NEW

const App = () => {
  return (
    <EventProvider>
      <div>
        <MiniChatbot />
        <Routes>
          <Route path="/" element={<UserEventBooking />} />
          <Route path="/booking" element={<BookingForm />} />
          <Route path="/payment" element={<PaymentScreen />} />
          <Route path="/success" element={<SuccessCelebration />} />
        </Routes>
      </div>
    </EventProvider>
  );
};

export default App;
