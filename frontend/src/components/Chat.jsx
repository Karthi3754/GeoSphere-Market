// frontend/src/components/Chat.jsx
import { useState, useEffect } from 'react';
import io from 'socket.io-client';

const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState('');
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    const newSocket = io('http://localhost:5000');
    setSocket(newSocket);

    newSocket.on('connect', () => {
      console.log('User socket connected');
    });

    newSocket.emit('joinRoom', 'user');

    newSocket.on('receiveMessage', ({ sender, message }) => {
      console.log('User received message:', { sender, message });
      if (sender === 'user' || sender === 'seller') { // Only show messages from user or seller
        setMessages((prevMessages) => {
          const updatedMessages = [...prevMessages, { sender, message }];
          console.log('User updated messages:', updatedMessages);
          return updatedMessages;
        });
      }
    });

    newSocket.on('connect_error', (error) => {
      console.error('User socket connection error:', error);
    });

    return () => {
      newSocket.off('receiveMessage');
      newSocket.disconnect();
    };
  }, []);

  const sendMessage = () => {
    if (message.trim() && socket) {
      console.log('User sending message:', { sender: 'user', recipient: 'seller', message });
      socket.emit('sendMessage', { sender: 'user', recipient: 'seller', message });
      setMessage('');
    }
  };

  return (
    <div>
      <h2>Chat with Seller</h2>
      <div style={{ height: '300px', overflowY: 'scroll', border: '1px solid #ccc', padding: '10px' }}>
        {messages.map((msg, index) => (
          <div
            key={index}
            style={{
              display: 'flex',
              justifyContent: msg.sender === 'user' ? 'flex-end' : 'flex-start',
              marginBottom: '10px',
            }}
          >
            <div
              style={{
                maxWidth: '60%',
                padding: '8px 12px',
                borderRadius: '10px',
                backgroundColor: msg.sender === 'user' ? '#DCF8C6' : '#E5E5EA',
                color: '#000',
              }}
            >
              <strong>{msg.sender}:</strong> {msg.message}
            </div>
          </div>
        ))}
      </div>
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Type a message..."
        style={{ width: '80%', padding: '8px', marginRight: '10px' }}
      />
      <button onClick={sendMessage}>Send</button>
    </div>
  );
};

export default Chat;