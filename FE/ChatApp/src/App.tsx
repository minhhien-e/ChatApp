import React from "react";
import { Route, Routes } from "react-router-dom";
import { AuthPage, ChatPage } from "./pages";
const App: React.FC = () => {
  return (
    <Routes>
      <Route path="/auth/:formType" element={<AuthPage />} />
      <Route path="/" element={<ChatPage />} />
    </Routes>
  );
};

export default App;
