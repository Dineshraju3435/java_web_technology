import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

import './login.css'

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    console.log('Logging in with:', { email, password });

    try {
      const response = await fetch('http://localhost:8000/Suma/login', {
        method: 'POST',
        credentials: "include",
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
            // This will send the cookie (useremail) along with the request
          'Authorization': 'Bearer your-token', 
        },
        body: new URLSearchParams({
          email: email,
          password: password,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage(data.message);
        console.log(data);
        navigate('/dashboard'); // Redirect to signin page after successful login
      } else {
        setMessage(data.message); // Show failure message
        console.log("Failed to log in:", data.message);
      }
    } catch (error) {
      console.error("Error:", error);
      setMessage("An error occurred during login.");
    }
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <div>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Login</button>
      </form>
      <p>Don't have an account? <Link to='/signin'>Sign up</Link></p>

      {message && <p>{message}</p>}

    
    </div>
  );
};

export default Login;
