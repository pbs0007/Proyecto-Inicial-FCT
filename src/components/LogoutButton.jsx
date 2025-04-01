import { supabase } from "../supabase/supabaseClient";
import { useNavigate } from "react-router-dom";
import "./LogoutButton.css";

//Botón que cierra la sesión del usuario y redirige al login

function LogoutButton() {
  const navigate = useNavigate();

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.error("Error al cerrar sesión:", error.message);
    } else {
      navigate("/login");
    }
  };

  return (
    <button onClick={handleLogout} className="logout-button">
      Cerrar sesión
    </button>
  );
}

export default LogoutButton;
