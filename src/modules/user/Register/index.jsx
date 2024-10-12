import { useState } from "react";
import { useUser } from "../UserContext";
import { useNavigate } from "react-router-dom";
import "./styles.css";

export const Register = () => {
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useUser();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Burada API çağrısı yapılacak ve kayıt işlemi gerçekleştirilecek
      const userData = { userName, email, token: "fake-token" }; //şifre saklanmıyor şifre token olarak görünüyor
      await login(userData); // Otomatik giriş yapılacak
      navigate("/"); // Ana sayfaya yönlendir
    } catch (error) {
      console.error("Registration failed:", error);
    }
  };

  return (
    <div className="register-container">
      <h2>Register</h2>
      <form onSubmit={handleSubmit} className="form">
        <div>
          <label htmlFor="name">User Name:</label>
          <input
            type="text"
            id="name"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="email">E-mail:</label>
          <input
            type="email"
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
        <button type="submit">Register</button>
      </form>
    </div>
  );
};
