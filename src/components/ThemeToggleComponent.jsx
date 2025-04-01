import { useState, useEffect } from "react";
import "./ThemeToggleComponent.css";

const ThemeToggleComponent = () => {
  // Estado para almacenar el tema seleccionado
  const [darkMode, setDarkMode] = useState(
    () => localStorage.getItem("theme") === "dark"
  );

  // Aplicar el tema seleccionado
  useEffect(() => {
    if (darkMode) {
      document.body.setAttribute("data-theme", "dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.body.setAttribute("data-theme", "light");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  // Alternar el tema
  const toggleTheme = (e) => {
    setDarkMode(e.target.checked);
  };

  return (
    <div className="dark-mode">
      <input
        className="dark-mode-input"
        type="checkbox"
        id="darkmode-toggle"
        onChange={toggleTheme}
        checked={darkMode}
      />
      <label className="dark-mode-label" htmlFor="darkmode-toggle">
        <h1>🌞</h1>
        <h1>🌙</h1>
      </label>
    </div>
  );
};

export default ThemeToggleComponent;
