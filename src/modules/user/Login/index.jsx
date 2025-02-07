import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../UserContext";

import { Link } from 'react-router-dom';

import "./styles.css";

export const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useUser();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Burada API çağrısı yapılacak

      await login({ email, token: "fake-token" });
      navigate("/"); // Başarılı girişten sonra ana sayfaya yönlendirir
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      <form onSubmit={handleSubmit} class="form">
        <div>
          <label htmlFor="username">E-mail:</label>
          <input
            type="text"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <button type="submit">Login</button>
      </form>
      <div className="register-link-container">
  <p>
    Don't have an account? <Link to="/register">Register here</Link>
  </p>
</div>


    </div>
  );
};
