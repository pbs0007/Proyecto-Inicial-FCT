import { Link } from "react-router-dom";
import "./SidebarComponent.css";
import ThemeToggleComponent from "./ThemeToggleComponent";
import { Boxes, Monitor, TableOfContents } from "lucide-react";

function SidebarComponent() {
  return (
    <div className="sidebar">
      <nav>
        <ul className="link-list">
          <li>
            <Link to="/control-panel" className="sidebar-link">
              <Monitor />
              <span>Panel de control</span>
            </Link>
          </li>
          <li>
            <Link to="/inventory" className="sidebar-link">
              <Boxes />
              <span>Productos</span>
            </Link>
          </li>
          <li>
            <Link to="/movements" className="sidebar-link">
              <TableOfContents />
              <span>Movimientos</span>
            </Link>
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
