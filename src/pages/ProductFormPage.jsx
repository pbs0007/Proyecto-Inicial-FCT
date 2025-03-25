import HeaderComponent from "../components/HeaderComponent";
import SidebarComponent from "../components/SidebarComponent";

function ProductFormPage() {
  return (
    <div className="product-form">
      <HeaderComponent></HeaderComponent>
      <SidebarComponent></SidebarComponent>
      <div className="principal"></div>
    </div>
  );
}

export default ProductFormPage;
