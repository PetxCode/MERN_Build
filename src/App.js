import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import CreateStore from "./component/CreateStore";
import HeaderComponent from "./component/HeaderComponent";
import HomeScreen from "./component/HomeScreen";
import Private from "./component/Private";
import Register from "./component/Register";
import SignIn from "./component/SignIn";

const App = () => {
  return (
    <div>
      <BrowserRouter>
        <HeaderComponent />
        <Routes>
          <Route path="/register" element={<Register />} />
          <Route path="/sign" element={<SignIn />} />
          <Route path="/" element={<HomeScreen />} />
          <Route
            path="/create"
            element={
              <Private>
                <CreateStore />
              </Private>
            }
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
