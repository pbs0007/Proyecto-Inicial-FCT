import { useState } from "react";
import { createClient } from "@supabase/supabase-js";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import ControlPanelPage from "./pages/ControlPanelPage";
import InventoryPage from "./pages/InventoryPage";
import ProductForm from "./pages/ProductFormPage";
import Movememets from "./pages/MovementsPage";

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
      <Route path="/inventory" element={<InventoryPage />} />
      <Route path="/producto-form" element={<ProductForm />} />
      <Route path="/movements" element={<Movememets />} />
    </Routes>
  );
}

export default App;
