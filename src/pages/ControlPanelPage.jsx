import { useState, useEffect } from "react";
import HeaderComponent from "../components/HeaderComponent";
import SidebarComponent from "../components/SidebarComponent";
import NotificationComponent from "../components/NotificationComponent";
import StatsCardsComponent from "../components/StatsCardsComponent";
import RegistroComponent from "../components/RegistroComponent";
import { AlignLeft, MoveLeft } from "lucide-react";

function ControlPanelPage() {
  const [hasShownNotification, setHasShownNotification] = useState(false);

  useEffect(() => {
    // Verificamos si la notificación ya ha sido mostrada usando localStorage
    const notificationShown = localStorage.getItem("notificationShown");

    if (!notificationShown) {
      setHasShownNotification(true);
      // Guardamos en localStorage que la notificación ha sido mostrada
      localStorage.setItem("notificationShown", "true");
    }
  }, []);

  return (
    <div id="control-panel">
      {hasShownNotification && <NotificationComponent />} <HeaderComponent />
      <SidebarComponent />
      <div className="principal">
        <StatsCardsComponent></StatsCardsComponent>
        <div style={{display:"flex",justifyContent: "flex-end",}}>
          <div style={{width:"20%",height:"20%"}}>
            <RegistroComponent></RegistroComponent>
          </div>
        </div>
        
        
      </div>
    </div>
  );
}

export default ControlPanelPage;
