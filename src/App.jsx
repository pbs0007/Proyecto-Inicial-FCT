import { useState } from "react";
import { createClient } from "@supabase/supabase-js";
import "./App.css";
import ControlPanelPage from "./pages/ControlPanelPage";
import { Route, Routes } from "react-router-dom";
import LoginPage from "./pages/LoginPage";

const supabase = createClient(
  import.meta.env.VITE_PROJECT_URL,
  import.meta.env.VITE_APIKEY
);
console.log(supabase);
function App() {
  return (
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route path="/control-panel" element={<ControlPanelPage />} />
    </Routes>
  );
}

export default App;
