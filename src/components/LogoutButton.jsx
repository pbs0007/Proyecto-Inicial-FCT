import { supabase } from "../supabase/supabaseClient";
import { useNavigate } from "react-router-dom";
import "./LogoutButton.css";
import { LogOut } from "lucide-react";

//Botón que cierra la sesión del usuario y redirige al login
function LogoutButton() {
  const navigate = useNavigate();

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.error("Error al cerrar sesión:", error.message);
    } else {
      navigate("/");
    }
  };

  return (
    <button onClick={handleLogout} className="logout-button">
      <LogOut className="logout-icon" />
      <span className="logout-text">Cerrar sesión</span>
    </button>
  );
}

export default LogoutButton;
