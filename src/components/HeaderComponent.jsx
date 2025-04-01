import DateTimeComponent from "./DateTimeComponent";
import "./HeaderComponent.css";
import LogoutButton from "./LogoutButton";

export default function HeaderComponent() {
  return (
    <div className="header">
      <div className="logo">
        <h1>Gestión de inventario</h1>
      </div>
      <div className="date-time-component">
        <DateTimeComponent></DateTimeComponent>
      </div>
      <div className="logout-component">
        <LogoutButton></LogoutButton>
      </div>
    </div>
  );
}
