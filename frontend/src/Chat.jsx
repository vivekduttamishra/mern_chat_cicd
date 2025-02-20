import  { useState, useEffect, useRef } from "react";
import { io } from "socket.io-client";
import "bootstrap/dist/css/bootstrap.min.css";

const SERVER_URL = import.meta.env.MODE === "development" ? "http://localhost" : "/";

const socket = io(SERVER_URL, { 
  transports: ["websocket"] }
);

const Chat = () => {
  const [name, setName] = useState("");
  const [room, setRoom] = useState("");
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [joined, setJoined] = useState(false);

  // Create a reference for scrolling
  const chatBoxRef = useRef(null);

  useEffect(() => {
    socket.on("message", (data) => {
      setMessages((prev) => [...prev, data]);

      // Auto-scroll when a new message arrives
      setTimeout(() => {
        chatBoxRef.current?.scrollTo({
          top: chatBoxRef.current.scrollHeight,
          behavior: "smooth",
        });
      }, 100);
    });

    return () => socket.off("message");
  }, []);

  const joinRoom = () => {
    if (name && room) {
      socket.emit("joinRoom", { name, room });
      setJoined(true);
    }
  };

  const leaveRoom = () => {
    socket.emit("leaveRoom");
    setJoined(false);
    setMessages([]);
  };

  const sendMessage = () => {
    if (message.trim()) {
      socket.emit("chatMessage", { room, name, message });
      setMessage("");
    }
  };

  return (
    <div className="container mt-3">
      <div className="card">
        <div className="card-header bg-primary text-white text-center">
          <h3>Chat Room</h3>
        </div>
        <div className="card-body">
          {!joined ? (
            <div>
              <input
                className="form-control mb-2"
                type="text"
                placeholder="Enter your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <input
                className="form-control mb-2"
                type="text"
                placeholder="Enter room name"
                value={room}
                onChange={(e) => setRoom(e.target.value)}
              />
              <button className="btn btn-primary w-100" onClick={joinRoom}>
                Join Room
              </button>
            </div>
          ) : (
            <>
              {/* Chat box with auto-scroll */}
              <div
                ref={chatBoxRef}
                className="chat-box mb-3 p-2 border"
                style={{ maxHeight: "300px", overflowY: "auto" }}
              >
                {messages.map((msg, index) => (
                  <div
                    key={index}
                    className={`rounded p-2 mb-2 ${msg.name === name ? "bg-primary text-white text-end" : "bg-light text-start"}`}
                    style={{ maxWidth: "70%", marginLeft: msg.name === name ? "auto" : "0" }}
                  >
                    <strong>{msg.name}</strong>
                    <div>{msg.message}</div>
                  </div>
                ))}
              </div>
              <input
                className="form-control"
                type="text"
                placeholder="Type a message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && sendMessage()}
              />
              <button className="btn btn-success mt-2 w-100" onClick={sendMessage}>
                Send
              </button>
              <button className="btn btn-danger mt-2 w-100" onClick={leaveRoom}>
              Leave Room
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Chat;
 