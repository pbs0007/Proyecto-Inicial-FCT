import HeaderComponent from "../components/HeaderComponent";
import ProductTableComponent from "../components/ProductTableComponent";
import SidebarComponent from "../components/SidebarComponent";
import RegisterProductComponent from "../components/RegisterProductComponent";

function InventoryPage() {
  return (
    <div id="inventory-page">
      <HeaderComponent></HeaderComponent>
      <SidebarComponent></SidebarComponent>

      <div className="principal">
        <ProductTableComponent></ProductTableComponent>
        <RegisterProductComponent></RegisterProductComponent>
      </div>
    </div>
  );
}

export default InventoryPage;
