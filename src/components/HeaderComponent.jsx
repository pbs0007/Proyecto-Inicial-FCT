import DateTimeComponent from "./DateTimeComponent";
import "./HeaderComponent.css";

export default function HeaderComponent() {
  return (
    <div className="header">
      <div className="logo">
        <h1>Gestión de inventario</h1>
      </div>
      <div className="date-time-component">
        <DateTimeComponent></DateTimeComponent>
      </div>
    </div>
  );
}
