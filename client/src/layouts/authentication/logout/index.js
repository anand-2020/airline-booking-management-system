import AuthContext from "authContext";
import { useContext, useEffect } from "react";
import { Navigate } from "react-router-dom";

const Logout = () => {
  const { updateAuthData } = useContext(AuthContext);

  useEffect(() => {
    updateAuthData(false, null, null, null);
    localStorage.removeItem("jwt");
  }, []);

  return <Navigate to="/" />;
};

export default Logout;
