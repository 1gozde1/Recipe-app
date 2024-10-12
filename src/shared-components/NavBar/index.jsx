import { Link, useNavigate } from "react-router-dom";
import { useUser } from "../../modules/user/UserContext";
import "./styles.css";

export const NavBar = () => {
  const { user, logout } = useUser();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <nav className="navbar">
      <ul className="navbar__list">
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/recipes/search">Search Recipes</Link>
        </li>
        <li>
          <Link to="/recipes/categories">Categories</Link>
        </li>
        {user && (
          <>
            <li>
              <Link to="/recipes/new">Create New Recipe</Link>
            </li>
            <li>
              <Link to="/user">Account</Link>
            </li>
            <li>
              <Link to="/settings">Settings</Link>
            </li>
          </>
        )}
        {!user ? (
          <li>
            <Link to="/login">Log in</Link>
          </li>
        ) : (
          <li>
            <button onClick={handleLogout}>Log out</button>
          </li>
        )}
      </ul>
    </nav>
  );
};
