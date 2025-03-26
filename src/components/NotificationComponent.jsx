import { useEffect, useRef } from "react";
import { useSnackbar } from "notistack";

function NotificationComponent() {
  const { enqueueSnackbar } = useSnackbar();
  const hasNotified = useRef(false);

  useEffect(() => {
    if (hasNotified.current) {
      return;
    }

    // Mostrar la notificación de bienvenida
    enqueueSnackbar("¡Bienvenido de nuevo!", {
      variant: "default",
      autoHideDuration: 5000,
      anchorOrigin: {
        vertical: "bottom",
        horizontal: "right",
      },
      style: {
        backgroundColor: "var(--background)",
        color: "var(--text)",
        borderRadius: 0,
      },
    });

    // Marcamos que la notificación ya se mostró
    hasNotified.current = true;
  }, [enqueueSnackbar]); // Solo se ejecuta cuando el componente se monta por primera vez

  return null;
}

export default NotificationComponent;
