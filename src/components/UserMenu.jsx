import { useState, useRef, useEffect } from "react";
import { LogOut, User, Pencil } from "lucide-react";
import { supabase } from "../supabase/supabaseClient";
import LogoutButton from "./LogoutButton";
import "./UserMenu.css";
import AvatarModal from "./AvatarModal";

//Muestra avatar (icono), saludo genérico y botón de logout 
//Lógica de despliegue y cierre del menú desplegable.
//También muestra modal para cambiar o eliminar imagen de perfil

function UserMenu() {
    const menuRef = useRef(null);

    const [isOpen, setIsOpen] = useState(false);

    const [username, setUsername] = useState("");

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [profileImage, setProfileImage] = useState(null);

    // Obtener el usuario actual 
    useEffect(() => {
        const getUserInfo = async () => {
            const { data, error } = await supabase.auth.getUser();
            if (data?.user?.email) {
                const name = data.user.email.split("@")[0];
                setUsername(name);
            }
        };

        getUserInfo();
        //recupera img del sessionStorage si existe
        const savedImage = sessionStorage.getItem("profileImage");
        if (savedImage) {
            setProfileImage(savedImage);
        }
    }, []);

    // Cierra menú desplegable al hacer clic fuera del elemento
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    const toggleMenu = () => setIsOpen(!isOpen);

    const handleLogout = async () => {
        await supabase.auth.signOut();
        window.location.href = "/"; // Redirige al login
    };

    // Cuando el usuario selecciona una imagen
    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            if (profileImage) {
                URL.revokeObjectURL(profileImage);
            }
            const imageUrl = URL.createObjectURL(file);
            setProfileImage(imageUrl);

            //Guarda img en sessionStorage
            sessionStorage.setItem("profileImage", imageUrl);
        }
    };

    // Eliminar imagen (solo resetea visualmente, no borra de Supabase aún)
    const handleRemoveImage = () => {
        if (profileImage) {
            URL.revokeObjectURL(profileImage);
        }
        setProfileImage(null);

        //elimina del sessionStorage
        sessionStorage.removeItem("profileImage");
    };


    // Abrir/Cerrar modal
    const toggleModal = () => setIsModalOpen((prev) => !prev);

    return (
        <div className="user-menu" ref={menuRef}>
            <div className="user-icon" onClick={toggleMenu}>
                {profileImage ? (
                    <img src={profileImage} alt="avatar" />
                ) : (
                    <User size={28} />
                )}
            </div>

            {isOpen && (
                <div className="menu-dropdown">
                    <p className="user-greeting">¡Hola, {username}! </p>

                    <div className="user-avatar-wrapper" onClick={toggleModal}>
                        {profileImage ? (
                            <img src={profileImage} alt="avatar-preview" className="user-avatar" />
                        ) : (
                            <User size={80} className="user-avatar" />
                        )}
                        <div className="edit-icon">
                            <Pencil size={20} />
                        </div>
                    </div>

                    <div className="logout-wrapper">
                        <LogoutButton></LogoutButton>
                    </div>
                </div>
            )}
            {isModalOpen && (
                <AvatarModal
                    onClose={toggleModal}
                    onChange={handleImageChange}
                    onRemove={handleRemoveImage}
                    currentImage={profileImage}
                />
            )
            }
        </div>



    );
}

export default UserMenu;
