import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";

const AuthRouteGuard = ({ children }) => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token) {
      navigate("/");
    }
  }, [token, navigate]);

  return <>{token ? children : null}</>;
};

AuthRouteGuard.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AuthRouteGuard;
