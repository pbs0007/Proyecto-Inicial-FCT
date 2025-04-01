import { Link } from "react-router-dom";
import "./SidebarComponent.css";
import ThemeToggleComponent from "./ThemeToggleComponent";

function SidebarComponent() {
  return (
    <div className="sidebar">
      <nav>
        <ul className="a-list">
          <li>
            <Link to="/control-panel">Panel de control</Link>
          </li>
          <li>
            <Link to="/inventory">Productos</Link>
          </li>
          <li>
            <Link to="/movements">Movimientos</Link>
          </li>
        </ul>
      </nav>

      <div className="theme-toggle-container">
        <ThemeToggleComponent></ThemeToggleComponent>
      </div>
    </div>
  );
}

export default SidebarComponent;
