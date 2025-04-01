import { useState, useEffect } from "react";
import HeaderComponent from "../components/HeaderComponent";
import SidebarComponent from "../components/SidebarComponent";
import NotificationComponent from "../components/NotificationComponent";
import ThemeToggleComponent from "../components/ThemeToggleComponent";

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
      <div className="principal"></div>
    </div>
  );
}

export default ControlPanelPage;
