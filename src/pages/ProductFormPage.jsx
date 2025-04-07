import HeaderComponent from "../components/HeaderComponent";
import SidebarComponent from "../components/SidebarComponent";
import FormComponent from "../components/FormComponent";

function ProductFormPage() {
  return (
    <div className="product-form">
      <HeaderComponent></HeaderComponent>
      <SidebarComponent></SidebarComponent>
      <div className="principal"></div>
      <FormComponent></FormComponent>
    </div>
  );
}

export default ProductFormPage;
