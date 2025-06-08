// src/KittyAi.jsx

import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import './KittyAi.css';

const KittyAi = () => {
  const navigate = useNavigate();

  const [messages, setMessages] = useState([
    { from: 'kitty', text: "Hewwo Mina! I'm Kitty, your AI friend! What do you wanna talk about? 💕" }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const getReply = async (userText) => {
    try {
      const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer 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', // 👈 put your key here
        },
        body: JSON.stringify({
          model: 'meta-llama/llama-4-scout-17b-16e-instruct',
          messages: [
            {
              role: 'user',
              content: "You are Hello Kitty, a kind and sweet AI friend. be beloving language be also mature."
            },
            { role: 'user', content: userText }
          ]
        })
      });

      const data = await response.json();
      return data.choices?.[0]?.message?.content || "Oopsie, Kitty had a hiccup! Try again later 🥺💔";
    } catch (error) {
      console.error('Kitty API error:', error);
      return "Nyaa~ there was a meow-up with the server! Try again soon 🐾";
    }
  };

  const handleSend = async () => {
    if (!input.trim()) return;
    const userMsg = { from: 'user', text: input.trim() };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);

    const reply = await getReply(userMsg.text);
    setMessages(prev => [...prev, { from: 'kitty', text: reply }]);
    setIsTyping(false);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="kittyai-container">

      {/* Home button top-left */}
      <button
        className="home-button"
        onClick={() => navigate('/room')}
        title="Back to Room"
      >
        🏠
      </button>

      <div className="kitty-header">
        <img
          src="/minaroom/KittyAi.png"
          alt="Kitty AI"
          className="kitty-avatar"
          draggable={false}
        />
        <h2>Chat with Kitty 💬</h2>
      </div>

      <div className="chat-window">
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`chat-message ${msg.from === 'kitty' ? 'kitty-msg' : 'user-msg'}`}
          >
            <p>{msg.text}</p>
          </div>
        ))}

        {isTyping && (
          <div className="chat-message kitty-msg typing">
            <p>Kitty is typing...</p>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      <textarea
        className="chat-input"
        placeholder="Say something to Kitty..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={handleKeyDown}
        rows={2}
      />

      <button className="send-button" onClick={handleSend} disabled={!input.trim()}>
        Send
      </button>
    </div>
  );
};

export default KittyAi;
