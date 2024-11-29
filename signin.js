import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import './signin.css';

const Signin = () => {
  const [Name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [Profession, setProfession] = useState("");
  const [Password, setPassword] = useState("");
  const [ConfirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleSignin = async (e) => {
    e.preventDefault();
    console.log('signin in with:', { email, Profession, Name, Password, ConfirmPassword });

    if (Password !== ConfirmPassword) {
      setMessage("Passwords do not match!");
      return;
    }

    try {
      const requestBody = new URLSearchParams({
        username: Name,
        email: email,
        profession: Profession,
        password: Password,
      });

      const response = await fetch("http://localhost:8000/Suma/register", {
        method: "POST",
        credentials : "include",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: requestBody.toString(),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage(data.message);
        console.log(data);
        navigate("/");
      } else {
        setMessage(data.message || "Registration Failed.");
      }
    } catch (error) {
      console.error("Error:", error);
      setMessage("An error occurred during registration.");
    }
  };

  return (
    <div className="signin-container">
      <h2>Sign in</h2>
      <form onSubmit={handleSignin}>
        <div>
          <label>Email: </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Username: </label>
          <input
            type="text"
            value={Name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Profession: </label>
          <div className="profession-options">
            <label>
              <input
                type="radio"
                value="student"
                name="profession"
                checked={Profession === "student"}
                onChange={(e) => setProfession(e.target.value)}
              />
              Student
            </label>
            <label>
              <input
                type="radio"
                value="professor"
                name="profession"
                checked={Profession === "professor"}
                onChange={(e) => setProfession(e.target.value)}
              />
              Professor
            </label>
            <label>
              <input
                type="radio"
                value="Software Developer"
                name="profession"
                checked={Profession === "Software Developer"}
                onChange={(e) => setProfession(e.target.value)}
              />
              Software Developer
            </label>
          </div>
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            value={Password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Confirm Password: </label>
          <input
            type="password"
            value={ConfirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </div>
        <div>
          <button type="submit">Sign in</button>
        </div>
        {message && <p>{message}</p>}
      </form>
    </div>
  );
};

export default Signin;
