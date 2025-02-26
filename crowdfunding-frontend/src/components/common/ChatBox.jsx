import { useState, useEffect, useRef } from "react";
import { ref, push, onValue, off } from "firebase/database";


const ChatBox = ({ campaignId, user }) => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    const messagesRef = ref(db, `chats/${campaignId}`);

    const unsubscribe = onValue(messagesRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        setMessages(Object.values(data));
      } else {
        setMessages([]); // No messages yet
      }
    });

    return () => off(messagesRef, "value", unsubscribe); // Cleanup on unmount
  }, [campaignId]);

  // Scroll to the latest message
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = async () => {
    if (message.trim()) {
      try {
        await push(ref(db, `chats/${campaignId}`), {
          user,
          message,
          timestamp: Date.now(),
        });
        setMessage(""); // Clear input after sending
      } catch (error) {
        console.error("Error sending message:", error);
      }
    }
  };

  return (
    <div style={styles.chatContainer}>
      {/* Messages Section */}
      <div style={styles.messagesContainer}>
        {messages.map((msg, index) => (
          <p key={index} style={styles.message}>
            <strong>{msg.user}:</strong> {msg.message}
          </p>
        ))}
        <div ref={messagesEndRef} /> {/* Auto-scroll anchor */}
      </div>

      {/* Input Section */}
      <div style={styles.inputContainer}>
        <input
          type="text"
          placeholder="Type a message..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          style={styles.input}
        />
        <button onClick={sendMessage} style={styles.sendButton}>Send</button>
      </div>
    </div>
  );
};

// Inline styles for basic UI
const styles = {
  chatContainer: {
    width: "100%",
    maxWidth: "400px",
    border: "1px solid #ccc",
    borderRadius: "8px",
    padding: "10px",
    background: "#fff",
  },
  messagesContainer: {
    maxHeight: "300px",
    overflowY: "auto",
    padding: "5px",
    borderBottom: "1px solid #ddd",
  },
  message: {
    margin: "5px 0",
    padding: "5px",
    background: "#f1f1f1",
    borderRadius: "5px",
  },
  inputContainer: {
    display: "flex",
    marginTop: "10px",
  },
  input: {
    flex: 1,
    padding: "8px",
    border: "1px solid #ccc",
    borderRadius: "5px",
    outline: "none",
  },
  sendButton: {
    marginLeft: "5px",
    padding: "8px 12px",
    background: "#007bff",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  },
};

export default ChatBox;

