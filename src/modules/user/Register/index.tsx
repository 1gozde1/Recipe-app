import { useState, FormEvent } from "react"; // FormEvent ekledik
import { useUser } from "../UserContext";
import { useNavigate } from "react-router-dom";
import "./styles.css";

// Register bileşeni
export const Register: React.FC = () => {
  // Durumlar (state) için türler tanımlandı
  const [userName, setUserName] = useState<string>(""); // string türü belirlendi
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const { login } = useUser(); // Context API çağrısı
  const navigate = useNavigate(); // Sayfa yönlendirme

  // Form gönderim fonksiyonu
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault(); // Formun varsayılan davranışını engelle

    try {
      // Kullanıcı verilerini oluştur
      const userData = { 
        userName, 
        email, 
        token: "fake-token" // Şifre saklanmıyor; bir token olarak görünüyor
      };

      await login(userData); // Kullanıcı giriş yap
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
