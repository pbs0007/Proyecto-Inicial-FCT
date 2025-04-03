import { useEffect, useState } from "react";
import { supabase } from "../supabase/supabaseClient";
import { Boxes, List, Users } from "lucide-react";
import "./StatsCardsComponent.css";

const StatsCardsComponent = () => {
  const [userCount, setUserCount] = useState(0);
  const [categoryCount, setCategoryCount] = useState(0);
  const [productCount, setProductCount] = useState(0);

  useEffect(() => {
    const fetchCounts = async () => {
      try {
        // Total de usuarios registrados
        // const { data: userData, error: userError } =
        //   await supabase.auth.api.listUsers();
        // if (userError) throw userError;

        // const userCount = userData.length;

        // Total de categorias registradas
        const { data: productData } = await supabase
          .from("products")
          .select("category")
          .neq("category", null);

        const categories = [
          ...new Set(productData.map((product) => product.category)),
        ];

        // Total de productos registrados
        const { count: productCount } = await supabase
          .from("products")
          .select("id", { count: "exact" });

        // Actualizar los estados con los valores obtenidos
        setUserCount(userCount);
        setCategoryCount(categories.length);
        setProductCount(productCount);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchCounts();
  }, []);

  return (
    <div className="stats-cards">
      {/* Usuarios */}
      <div className="stats-card">
        <div className="icons">
          <Users className="icon"></Users>
        </div>
        <div className="stats">
          <p className="stats-lenght">{userCount}</p>
          <p className="data-stats">Usuarios</p>
        </div>
      </div>

      {/* Categorías */}
      <div className="stats-card">
        <div className="icons">
          <List className="icon"></List>
        </div>
        <div className="stats">
          <p className="stats-lenght">{categoryCount}</p>
          <p className="data-stats">Categorías</p>
        </div>
      </div>

      {/* Productos */}
      <div className="stats-card">
        <div className="icons">
          <Boxes className="icon"></Boxes>
        </div>
        <div className="stats">
          <p className="stats-lenght">{productCount}</p>
          <p className="data-stats">Productos</p>
        </div>
      </div>
    </div>
  );
};

export default StatsCardsComponent;
