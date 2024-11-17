import { useState, FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../UserContext";
import { Link } from "react-router-dom";
import "./styles.css";

export const Login: React.FC = () => { // Functional Component (Fonksiyonel Bileşen)props ile çalışırken tür güvenliği sağlar
  // State türleri belirleniyor
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  // Context ve navigate fonksiyonları
  const { login } = useUser(); // login fonksiyonunun tipi UserContext'te tanımlanmalı
  const navigate = useNavigate();

  // Form submit handler
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      // Burada API çağrısı yapılabilir
      await login({ email, token: "fake-token" }); // login fonksiyonunun tipi Context'te tanımlanmalı
      navigate("/"); // Başarılı girişten sonra ana sayfaya yönlendirir
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      <form onSubmit={handleSubmit} className="form">
        <div>
          <label htmlFor="email">E-mail:</label>
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
