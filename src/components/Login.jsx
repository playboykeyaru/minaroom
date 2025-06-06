import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';

const basePath = import.meta.env.BASE_URL || '/';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [kittyHeads, setKittyHeads] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const totalHeads = 18;
    const heads = [...Array(totalHeads)].map(() => {
      return {
        id: crypto.randomUUID(),
        left: Math.random() < 0.5 ? Math.random() * 40 : 60 + Math.random() * 40,
        duration: 10 + Math.random() * 5,
        delay: -(Math.random() * 5),
        rotation: Math.random() * 60 - 30,
      };
    });
    setKittyHeads(heads);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (username === 'minh' && password === 'mina1303') {
      navigate('/room');
    } else {
      alert("Wrong username or password!");
    }
  };

  return (
    <div className="login-container">
      {/* Floaty Kitty Heads */}
      {kittyHeads.map((head) => (
        <img
          key={head.id}
          src={`${basePath}HKloginfloat.png`}
          alt="Floating Kitty"
          className="floating-kitty"
          style={{
            left: `${head.left}%`,
            animationDuration: `${head.duration}s`,
            animationDelay: `${head.delay}s`,
            transform: `rotate(${head.rotation}deg)`,
          }}
        />
      ))}

      <form className="login-box" onSubmit={handleSubmit}>
        <img
          src={`${basePath}HKloginLogo.png`}
          alt="Hello Kitty"
          className="login-logo"
        />

        <input
          type="text"
          placeholder="Name"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="login-input"
        />

        <input
          type={showPassword ? 'text' : 'password'}
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="login-input"
        />

        {/* Show Password Toggle */}
        <label className="show-password">
          <input
            type="checkbox"
            checked={showPassword}
            onChange={() => setShowPassword(!showPassword)}
          />
          Show Password
        </label>

        <button type="submit" className="login-button">Enter</button>
      </form>
    </div>
  );
};

export default Login;
