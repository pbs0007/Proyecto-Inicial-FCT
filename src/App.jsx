import React, { useState, useEffect } from "react";
import "./App.css";
import HeaderComponent from "./components/HeaderComponent";
import SidebarComponent from "./components/SidebarComponent";
import { supabase } from './supabase/supabaseClient'
import Auth from './components/Auth'
import { Route, Routes, Navigate } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import ControlPanelPage from "./pages/ControlPanelPage";
import InventoryPage from "./pages/InventoryPage";
import ProductForm from "./pages/ProductFormPage";
import Movements from "./pages/MovementsPage";


function App() {
  const [session, setSession] = useState(null);

  useEffect(() => {
    // Obtener la sesión actual al cargar la app
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    // Escuchar cambios en el estado de sesión (login, logout, etc.)
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    //Limpia el listener al cerrar app
    return () => {
      subscription.unsubscribe();
    };
  }, []);

  return (
    <Routes>
      {/*Ruta de login accesible siempre*/ }
      <Route path="/login-page" element={<LoginPage />} />
      {/*Rutas protegidas por sesión*/}
      <Route path="/control-panel" element={session ?<ControlPanelPage />: <Navigate to="/login-page" />} />
      <Route path="/inventory" element={session ? <InventoryPage /> : <Navigate to="/login-page" />} />
      <Route path="/producto-form" element={session ? <ProductForm /> :<Navigate to="/login-page" />} />
      <Route path="/movements" element={session ?<Movements />: <Navigate to="/login-page" />} />

      {/*Redirección por defecto a la página de login*/}
      <Route path="/" element={<Navigate to="/login-page" />} />
      
    </Routes>
  );
}

export default App;
