import { useEffect, useState } from "react";
import { supabase } from "../supabase/supabaseClient";
import "./CategoryFilterComponent.css";

function CategoryFilter({ onCategoriaSeleccionada }) {
  const [categorias, setCategorias] = useState([]);
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState("");

  useEffect(() => {
    const obtenerCategorias = async () => {
      const { data, error } = await supabase
        .from("products")
        .select("category");

      if (!error && data) {
        const categoriasUnicas = [
          ...new Set(data.map((item) => item.category).filter(Boolean)),
        ].sort();
        setCategorias(categoriasUnicas);
      } else {
        console.error("Error al obtener categorías:", error);
      }
    };

    obtenerCategorias();
  }, []);

  const handleChange = (e) => {
    const valor = e.target.value;
    setCategoriaSeleccionada(valor);
    onCategoriaSeleccionada(valor);
  };

  return (
    <div className="category-filter-container">
      <select
        id="categoria"
        onChange={handleChange}
        className="category-filter"
        value={categoriaSeleccionada}
      >
        <option value="" disabled hidden>
          Filtrar por categoría
        </option>
        <option value="">Todas las categorías</option>
        {categorias.map((categoria, index) => (
          <option key={index} value={categoria}>
            {categoria}
          </option>
        ))}
      </select>
    </div>
  );
}

export default CategoryFilter;
