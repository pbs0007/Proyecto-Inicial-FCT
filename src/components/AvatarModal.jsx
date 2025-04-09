import "./AvatarModal.css";
import { useEffect, useRef } from "react";
import { X, Pencil, Trash2, User } from "lucide-react";

function AvatarModal({ onClose, onChange, onRemove, currentImage }) {
    const modalRef = useRef();

    // Cierra el modal si se hace clic fuera
    useEffect(() => {
        const handleOutsideClick = (e) => {
            if (modalRef.current && !modalRef.current.contains(e.target)) {
                onClose();
            }
        };
        document.addEventListener("mousedown", handleOutsideClick);
        return () => {
            document.removeEventListener("mousedown", handleOutsideClick);
        };
    }, [onClose]);

    const fileInputRef = useRef(null);


    return (
        <div className="avatar-modal-overlay">
            <div className="avatar-modal" ref={modalRef}>
                <button className="close-button" onClick={onClose}>
                    <X />
                </button>
                <h3>Imagen de perfil</h3>
                <div className="avatar-preview" onClick={() => fileInputRef.current?.click()}>
                    {currentImage ? (
                        <img src={currentImage} alt="img-perfil" className="default-user-icon" />
                    ) : (
                        <User size={80} className="default-user-icon" />
                    )}
                </div>
                <div className="avatar-actions">
                    <label className="avatar-btn modificar">
                        <Pencil size={16} />
                        Modificar
                        <input type="file" hidden onChange={onChange} />
                    </label>
                    <button className="avatar-btn eliminar" onClick={onRemove}>
                        <Trash2 size={16} />
                        Eliminar
                    </button>
                </div>
                <input
                    type="file"
                    hidden
                    ref={fileInputRef}
                    onChange={onChange}
                />
            </div>
        </div>
    );

}

export default AvatarModal;
