import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Secretpage from "./pages/Secretpage";
import Signin from "./pages/Signin";
import Signup from "./pages/Signup";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Signin />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/secret" element={<Secretpage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
