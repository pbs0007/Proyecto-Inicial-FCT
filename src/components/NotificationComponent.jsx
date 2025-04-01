import { useEffect, useRef, useState } from "react";
import { useSnackbar } from "notistack";
import { supabase } from "../supabase/supabaseClient";

function NotificationComponent() {
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const hasNotifiedWelcome = useRef(false);
  const [lowStockProducts, setLowStockProducts] = useState([]);
  const notifiedProducts = useRef(new Set());

  useEffect(() => {
    // Notificación de bienvenida
    if (!hasNotifiedWelcome.current) {
      enqueueSnackbar("¡Bienvenido de nuevo!", {
        variant: "success",
        autoHideDuration: 5000,
        anchorOrigin: { vertical: "bottom", horizontal: "right" },
        style: {
          backgroundColor: "var(--component-background)",
          color: "var(--text-primary)",
          fontSize: "15px",
        },
      });
      hasNotifiedWelcome.current = true;
    }

    // Obtener productos con stock bajo
    const fetchLowStockProducts = async () => {
      const { data, error } = await supabase
        .from("products")
        .select("id, name, stock")
        .lt("stock", 5);

      if (!error) {
        setLowStockProducts(data);
      }
    };

    fetchLowStockProducts();

    // Obtención de datos en tiempo real de cambios en la tabla "products"
    const channel = supabase
      .channel("realtime:products")
      .on(
        "postgres_changes",
        { event: "UPDATE", schema: "public", table: "products" },
        (payload) => {
          console.log("Stock actualizado:", payload.new);
          fetchLowStockProducts();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [enqueueSnackbar]);

  useEffect(() => {
    lowStockProducts.forEach((product) => {
      if (!notifiedProducts.current.has(product.id)) {
        enqueueSnackbar(
          `Stock bajo: ${product.name} (${product.stock} unidades)`,
          {
            variant: "warning",
            anchorOrigin: { vertical: "bottom", horizontal: "right" },
            persist: true,
            action: (key) => (
              <button
                onClick={() => closeSnackbar(key)}
                style={{
                  background: "transparent",
                  border: "none",
                  cursor: "pointer",
                  fontSize: "15px",
                  color: "var(--text-primary)",
                  marginLeft: 0,
                  marginRight: "10px",
                }}
              >
                &#10006;
              </button>
            ),
            style: {
              backgroundColor: "var(--component-background)",
              color: "var(--text-primary)",
              fontSize: "15px",
            },
          }
        );
        notifiedProducts.current.add(product.id);
      }
    });
  }, [lowStockProducts, enqueueSnackbar, closeSnackbar]);

  return null;
}

export default NotificationComponent;
