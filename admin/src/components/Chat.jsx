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
      console.log('Admin socket connected');
    });

    newSocket.emit('joinRoom', 'admin');

    newSocket.on('receiveMessage', ({ sender, message }) => {
      console.log('Admin received message:', { sender, message });
      if (sender === 'admin' || sender === 'seller') { // Only show messages from admin or seller
        setMessages((prevMessages) => {
          const updatedMessages = [...prevMessages, { sender, message }];
          console.log('Admin updated messages:', updatedMessages);
          return updatedMessages;
        });
      }
    });

    newSocket.on('connect_error', (error) => {
      console.error('Admin socket connection error:', error);
    });

    return () => {
      newSocket.off('receiveMessage');
      newSocket.disconnect();
    };
  }, []);

  const sendMessage = () => {
    if (message.trim() && socket) {
      console.log('Admin sending message:', { sender: 'admin', recipient: 'seller', message });
      socket.emit('sendMessage', { sender: 'admin', recipient: 'seller', message });
      setMessage('');
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      sendMessage();
    }
  };

  return (
    <div className="flex flex-col h-full border-4 border-purple-600 min-h-96 bg-purple-50">
      {/* Header with smaller height */}
      <div className="flex items-center p-2 text-white shadow-md bg-gradient-to-r from-purple-600 to-blue-500">
        <div className="flex items-center justify-center w-8 h-8 mr-2 bg-white border-2 border-purple-500 rounded-full shadow-inner">
          <span className="text-lg">🏪</span>
        </div>
        <h2 className="text-lg font-medium">Seller</h2>
      </div>

      {/* Chat messages area - reduced padding */}
      <div className="flex-1 p-2 overflow-y-auto"
        style={{ 
          backgroundImage: "linear-gradient(rgba(255,255,255,0.7), rgba(255,255,255,0.7)), url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAQAAABKfvVzAAAAJklEQVQ4y2NgGAWjYFCBPxCDGcQQOoYhwYNi5iBLMbgEI8YlhzsAAG9HAgFMvCpWAAAAAElFTkSuQmCC')",
          backgroundRepeat: 'repeat',
          backgroundColor: '#f3e8ff'
        }}
      >
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`flex ${msg.sender === 'admin' ? 'justify-end' : 'justify-start'} mb-1`}
          >
            <div
              className={`max-w-xs md:max-w-md px-2 py-1 rounded-lg ${
                msg.sender === 'admin'
                  ? 'bg-gradient-to-br from-blue-400 to-indigo-500 text-white rounded-tr-none border border-purple-400'
                  : 'bg-white text-gray-800 rounded-tl-none border border-purple-300'
              } shadow-sm`}
            >
              <p className="text-xs">{msg.message}</p>
              <p className={`text-right text-xs ${msg.sender === 'admin' ? 'text-blue-100' : 'text-gray-500'} mt-1`}>
                {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                {msg.sender === 'admin' && (
                  <span className="ml-1 text-white">✓✓</span>
                )}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Message input area - reduced padding */}
      <div className="flex items-center p-2 bg-purple-100">
        <div className="flex items-center flex-1 px-3 py-1 mr-2 bg-white border border-purple-400 rounded-full shadow-sm">
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Type a message"
            className="flex-1 text-sm text-gray-800 outline-none"
          />
          <button className="mx-1 text-lg text-purple-500 hover:text-purple-700">😊</button>
          <button className="mx-1 text-lg text-purple-500 hover:text-purple-700">📎</button>
        </div>
        <button 
          onClick={sendMessage}
          className="flex items-center justify-center w-8 h-8 text-white transition-shadow duration-300 border border-purple-500 rounded-full shadow-sm bg-gradient-to-r from-purple-600 to-blue-500 hover:shadow-md focus:outline-none"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default Chat;