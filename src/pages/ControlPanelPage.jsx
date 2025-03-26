import HeaderComponent from "../components/HeaderComponent";
import SidebarComponent from "../components/SidebarComponent";

function ControlPanelPage() {
  return (
    <div id="control-panel">
      <HeaderComponent></HeaderComponent>
      <SidebarComponent></SidebarComponent>
      <div className="principal"></div>
    </div>
  );
}

export default ControlPanelPage;
