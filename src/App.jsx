import React, { useState, useEffect } from "react";
import "./App.css";
import HeaderComponent from "./components/HeaderComponent";
import SidebarComponent from "./components/SidebarComponent";
import { supabase } from './supabase/supabaseClient'
import Auth from './components/Auth'


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

  //Si no hay sesión activa, redirige a la página de inicio de sesiónv(componente Auth)
  if (!session) {
    return <Auth></Auth>;
  }

  //Hay sesión activa, muestra contenido
  return (
    <>
      <div>
        <HeaderComponent></HeaderComponent>
        <SidebarComponent></SidebarComponent>
        <div className="principal"></div>
      </div>
    </>
  );
}

export default App;
