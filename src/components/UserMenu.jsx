import { useState, useRef, useEffect } from "react";
import { User, Pencil } from "lucide-react";
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
    const [userId, setUserId] = useState(null); //id del usuario actual
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [profileImage, setProfileImage] = useState(null);


    // Obtener el usuario actual 
    useEffect(() => {
        const getUserInfo = async () => {
            const { data, error } = await supabase.auth.getUser();
            if (data?.user?.email) {
                const name = data.user.email.split("@")[0];
                setUsername(name);
                setUserId(data.user.id); //guarda user id para usarlo en path
            }
        };

        getUserInfo();

        //recupera img del sessionStorage si existe
        const savedImage = sessionStorage.getItem("profileImage");
        const savedPath = sessionStorage.getItem("profileImagePath");
        if (savedImage && savedPath) {
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

    // Cuando el usuario selecciona una imagen guarda en Supabase Storage
    const handleImageChange = async (e) => {
        //borrar img anterior al subir una nueva
        const previousPath = sessionStorage.getItem("profileImagePath");
        if (previousPath) {
            await supabase.storage.from("avatars").remove([previousPath]);
        }

        const file = e.target.files[0];
        if (!file || !userId) return;

        const fileExt = file.name.split(".").pop();
        const uniqueFileName = `avatar-${Date.now()}.${fileExt}`; // nombre único para la imagen
        const filePath = `${userId}/${uniqueFileName}`;

        const { error: uploadError } = await supabase.storage
            .from("avatars")
            .upload(filePath, file, {
                cacheControl: "3600",
                upsert: true,
                contentType: file.type, //detecta tipo MIME (png, jpg, etc)
            });

        if (uploadError) {
            console.error("Error al subir imagen:", uploadError.message);
            return;
        }

        const { data: publicUrlData } = supabase.storage
            .from("avatars")
            .getPublicUrl(filePath);

        const imageUrl = publicUrlData.publicUrl;
        setProfileImage(imageUrl);
        sessionStorage.setItem("profileImage", imageUrl);
        sessionStorage.setItem("profileImagePath", filePath);

    };

    // Eliminar imagen 
    const handleRemoveImage = async () => {
        if (!userId) return;

        const imagePath = sessionStorage.getItem("profileImagePath");
        if (!imagePath) return;

        const { error } = await supabase.storage
            .from("avatars")
            .remove([imagePath]);

        if (error) {
            console.error("Error al eliminar la imagen de Supabase:", error.message);
        }

        setProfileImage(null);
        sessionStorage.removeItem("profileImage");
        sessionStorage.removeItem("profileImagePath");
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
};

export default UserMenu;
