import { Link } from "react-router-dom";
import "./SidebarComponent.css";

function SidebarComponent() {
  return (
    <nav className="sidebar">
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
  );
}

export default SidebarComponent;
