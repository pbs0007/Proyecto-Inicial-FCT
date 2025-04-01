import { useState } from "react";
import { supabase } from "../supabase/supabaseClient";
import { useNavigate } from "react-router-dom";
import "../components/Auth.css";

/**
 * Página para que el usuario cambie su contraseña tras abrir el enlace del email.
 */

function ResetPasswordPage() {
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleReset = async (e) => {
        e.preventDefault();
        setError(null);

        if (newPassword !== confirmPassword) {
            setError("Las contraseñas no coinciden.");
            return;
        }

        const { error } = await supabase.auth.updateUser({
            password: newPassword,
        });

        if (error) {
            setError("Error al cambiar la contraseña: " + error.message);
        } else {
            alert("Contraseña cambiada correctamente.");
            navigate("/");
        }
    };

    return (
        <div className="auth-container">
            <div className="auth-box">
                <h2 className="auth-title">Restablecer contraseña</h2>
                <form className="auth-form" onSubmit={handleReset}>
                    <label htmlFor="new-password">Nueva contraseña</label>
                    <input
                        type="password"
                        id="new-password"
                        className="auth-input"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        placeholder="Introduce tu nueva contraseña"
                    />

                    <label htmlFor="confirm-password">Confirmar contraseña</label>
                    <input
                        type="password"
                        id="confirm-password"
                        className="auth-input"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        placeholder="Confirma tu nueva contraseña"
                    />

                    <button type="submit" className="auth-button">
                        Cambiar contraseña
                    </button>

                    {error && <p className="auth-error">{error}</p>}
                </form>
            </div>
        </div>
    );
}

export default ResetPasswordPage;
