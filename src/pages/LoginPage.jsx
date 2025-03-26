import { use } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../supabase/supabaseClient";
import Auth from "../components/Auth";

function LoginPage() {
  const navigate = useNavigate();

  //Escucha cambios de sesión (login, logout, etc.)
  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session) {
        navigate("/control-panel");
      }
    });

    //Limpia el listener al cerrar app
    return () => {
      subscription.unsubscribe();
    };
    
  }, []);

  return (
    <div id="login-page" className="login-form">
      <Auth></Auth>
    </div>
  );
}

export default LoginPage;
