import React, { useState, useEffect } from "react";
import "./App.css";
import { supabase } from "./supabase/supabaseClient";
import Auth from "./components/Auth";
import { Route, Routes } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import ControlPanelPage from "./pages/ControlPanelPage";
import InventoryPage from "./pages/InventoryPage";
import ProductForm from "./pages/ProductFormPage";
import Movememets from "./pages/MovementsPage";
import { SnackbarProvider } from "notistack";
import NotificationComponent from "./components/NotificationComponent";
import ResetPasswordPage from "./pages/ResetPasswordPage";
import ProductFormPage from "./pages/ProductFormPage";

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

  //Si no hay sesión activa, redirige a la página de inicio de sesión(componente Auth)
  if (!session) {
    return <Auth></Auth>;
  }

  // Hay sesión activa, muestra contenido
  return (
    <SnackbarProvider maxSnack={5}>
      <NotificationComponent></NotificationComponent>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/reset-password" element={<ResetPasswordPage />} />
        <Route path="/control-panel" element={<ControlPanelPage />} />
        <Route path="/inventory" element={<InventoryPage />} />
        <Route path="/product-form" element={<ProductFormPage />} />
        <Route path="/movements" element={<Movememets />} />
      </Routes>
    </SnackbarProvider>
  );
}

export default App;
