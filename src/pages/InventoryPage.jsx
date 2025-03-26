import HeaderComponent from "../components/HeaderComponent";
import SidebarComponent from "../components/SidebarComponent";

function InventoryPage() {
  return (
    <div id="inventory-page">
      <HeaderComponent></HeaderComponent>
      <SidebarComponent></SidebarComponent>
      <div className="principal"></div>
    </div>
  );
}

export default InventoryPage;
