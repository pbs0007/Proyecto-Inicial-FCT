import { useState } from "react";
import { LogOut, User } from "lucide-react";
import { supabase } from "../supabase/supabaseClient";
import LogoutButton from "./LogoutButton";
import "./UserMenu.css";

//Muestra avatar (icono), saludo genérico y botón de logout 
//Lógica de despliegue y cierre del menú desplegable.

function UserMenu() {
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => setIsOpen(!isOpen);

    const handleLogout = async () => {
        await supabase.auth.signOut();
        window.location.href = "/"; // Redirige al login
    };

    return (
        <div className="user-menu">
            <div className="user-icon" onClick={toggleMenu}>
                <User size={28} />
            </div>

            {isOpen && (
                <div className="menu-dropdown">
                    <p>¡Hola!</p>
                    
                    <div className="user-avatar-wrapper">
                        <User size={80} className="user-avatar" />
                    </div>

                    <div className="logout-wrapper">
                        <LogoutButton></LogoutButton>
                    </div>
                </div>
            )}
        </div>
    );
}

export default UserMenu;
