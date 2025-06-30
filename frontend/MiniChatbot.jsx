import React, { useState } from "react";
import "./MiniChatbot.css";

const MiniChatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { text: "Hi! I'm your assistant. How can I help?", sender: "bot" }
  ]);
  const [input, setInput] = useState("");

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  const handleSend = () => {
    if (!input.trim()) return;
    const userMsg = { text: input, sender: "user" };
    const botMsg = { text: generateBotResponse(input), sender: "bot" };
    setMessages([...messages, userMsg, botMsg]);
    setInput("");
  };

  const generateBotResponse = (query) => {
    const q = query.toLowerCase();
    if (q.includes("book") || q.includes("ticket")) {
      return "To book a ticket, click the 'Book Now' button on the event.";
    } else if (q.includes("direction") || q.includes("map")) {
      return "Click 'View Directions' to open Google Maps.";
    } else if (q.includes("profile")) {
      return "Click your profile icon at the top to view your profile.";
    } else if (q.includes("filter") || q.includes("search")) {
      return "Use the search bar or filters at the top to refine events.";
    } else {
      return "I'm here to help with bookings, maps, or your profile!";
    }
  };

  return (
    <div className="chatbot-container">
      <button className="chat-toggle" onClick={toggleChat}>
        {isOpen ? "✖" : "💬"}
      </button>
      {isOpen && (
        <div className="chat-window">
          <div className="chat-messages">
            {messages.map((msg, idx) => (
              <div key={idx} className={`chat-msg ${msg.sender}`}>
                {msg.text}
              </div>
            ))}
          </div>
          <div className="chat-input">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask something..."
            />
            <button onClick={handleSend}>Send</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default MiniChatbot;
