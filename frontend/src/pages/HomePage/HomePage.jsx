// import styles from "./HomePage.module.css";
import NavbarComponent from "../../components/Navbar/NavbarComponent";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  
  }
  return (
    <div>
      <NavbarComponent />
      <h1>Home Page</h1>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default HomePage;
