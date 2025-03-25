import React from 'react'

//Formulario de inicio de sesión
function Auth() {
    return (
        <div className="auth-container">
            <div className="auth-box">
                <h2 className="auth-title">
                    Iniciar sesión
                </h2>
                <p className="auth-subtitle">
                    Formulario de inicio de sesión
                </p>

                <form className="auth-form">
                    <label htmlFor="email">Correo electrónico:  </label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        placeholder="Introduzca su correo electrónico"
                        className="auth-input" 
                    />
                    <br />

                    <label htmlFor="password">Contraseña:  </label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        placeholder="Introduzca su contraseña"
                        className="auth-input"
                    />
                    <br />

                    <button type="submit" className="auth-button">
                        Iniciar sesión
                    </button>

                </form>

                <p className="auth-forgot">
                    ¿Ha olvidado su contraseña?
                    <a href="#">
                        Recuperar contraseña
                    </a>
                </p>

            </div>
        </div>
    )
}

export default Auth