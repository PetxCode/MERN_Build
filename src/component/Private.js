import React, { useContext } from "react";
import { AuthContext } from "../Global/AuthProvider";
import { Navigate } from "react-router-dom";

const Private = ({ children }) => {
  //   const navigate = useNavigate();
  const { userData } = useContext(AuthContext);

  return <div>{userData ? children : <Navigate to="/sign" />}</div>;
};

export default Private;
