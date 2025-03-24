import "./SidebarComponent.css";

function SidebarComponent() {
  return (
    <nav className="sidebar">
      <ul className="a-list">
        <li>
          <a href="#">Panel de control</a>
        </li>
        <li>
          <a href="#">Productos</a>
        </li>
        <li>
          <a href="#">Movimientos</a>
        </li>
        <li>
          <a href="#">Accesos</a>
        </li>
      </ul>
    </nav>
  );
}

export default SidebarComponent;
