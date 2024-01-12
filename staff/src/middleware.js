// middleware.js
import { useNavigate } from "react-router-dom";

export const bearerMiddleware = () => (next) => (action) => {
  const navigate = useNavigate();
  const token = localStorage.getItem("staff_auth_token");
  if (!token) {
    navigate("/signin");
    return;
  } else {
    return next(action);
  }
};
