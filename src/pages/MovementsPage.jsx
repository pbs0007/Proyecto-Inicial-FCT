import HeaderComponent from "../components/HeaderComponent";
import SidebarComponent from "../components/SidebarComponent";

function MovementsPage() {
  return (
    <div id="movements">
      <HeaderComponent></HeaderComponent>
      <SidebarComponent></SidebarComponent>
      <div className="principal"></div>
    </div>
  );
}

export default MovementsPage;
