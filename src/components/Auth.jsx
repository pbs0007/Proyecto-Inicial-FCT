import React, { useState } from 'react'
import { supabase } from "../supabase/supabaseClient";
import "./Auth.css";


//Formulario de inicio de sesión
function Auth() {

    //Estado para almacenar el email introducido por usuario
    const [email, setEmail] = useState("")

    //Estado para almacenar la contraseña introducida por usuario
    const [password, setPassword] = useState("")

    //Estado para mostrar mensaje error si login falla
    const [error, setError] = useState(null)

    /**Función handleLogin que se ejecuta cuando el usuario envía el formulario 
     * Llama a supabase para intentar iniciar sesión con email y contraseña
     */
    const handleLogin = async (e) => {
        e.preventDefault()                  //Evita que página recargue al enviar formulario
        setError(null)                      //Borra errores anteriores

        //Llamada a supabase para iniciar sesión
        const { error } = await supabase.auth.signInWithPassword({ email, password })

        //Hay error, muestra mensaje
        if (error) {
            setError(error.message)
        }
    }

    /**Envía correo al usuario con enlace para reestablecer contraseña. */
    const handlePasswordReset = async () => {
        if (!email) {
            setError("Por favor, introduzca su correo electrónico.")
            return;
        }
        const { error } = await supabase.auth.resetPasswordForEmail(email, {
            redirectTo: `${window.location.origin}/reset-password` //redirecciona al usuario a la página de reseteo de contraseña 
        });
        if (error) {
            setError("Error al enviar el correo de recuperación" + error.message)
        } else {
            alert("Se ha enviado un correo electrónico con un enlace para restablecer su contraseña. Verifique su bandeja de entrada.");
        }
    };

    return (
        <div className="auth-container">
            <h1 className="auth-main-title">
                Gestión de inventario
            </h1>
            <div className="auth-box">
                <h2 className="auth-title">
                    Iniciar sesión
                </h2>
                <p className="auth-subtitle">
                    Formulario de inicio de sesión
                </p>

                <form className="auth-form" onSubmit={handleLogin}> {/*form ejecuta handleLogin al enviar*/}
                    <label htmlFor="email">Correo electrónico:  </label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        placeholder="Introduzca su correo electrónico"
                        className="auth-input"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <br />

                    <label htmlFor="password">Contraseña:  </label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        placeholder="Introduzca su contraseña"
                        className="auth-input"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <br />

                    <button type="submit" className="auth-button">
                        Iniciar sesión
                    </button>

                </form>
                {/*Si hay error, muestra mensaje*/}
                {error && <p className="auth-error">{error}</p>}


                <p className="auth-forgot">
                    ¿Ha olvidado su contraseña? {""}
                    <button onClick={handlePasswordReset} className='auth-link'>
                        Recuperar contraseña
                    </button>
                </p>

            </div>
        </div>
    )
}

export default Auth