import { useEffect, useState } from "react";
import { supabase } from "../supabase/supabaseClient";
import "./ProductTableComponent.css";

function ProductTableComponent() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const { data, error } = await supabase
        .from("products")
        .select("id, name, description, category, price, stock");

      if (error) {
        console.log("Error al obtener los productos", error);
      } else {
        setProducts(data);
      }
    };

    fetchProducts();
  }, []);

  const handleDelete = async (id) => {
    const confirm = window.confirm("¿Seguro que desea eliminar este producto?");
    if (!confirm) return;

    const { error } = await supabase.from("products").delete().eq("id", id);

    if (error) {
      console.error("Error al eliminar:", error.message);
      alert("Ha habido un error al eliminar el producto.");
    } else {
      setProducts(products.filter((producto) => producto.id !== id));
      alert("Producto eliminado correctamente.");
    }
  };

  return (
    <div className="product-table">
      <h1 className="table-tittle">Productos disponibles</h1>
      <table className="table">
        <thead>
          <tr className="tr">
            <th className="th"></th>
            <th className="th">Nombre</th>
            <th className="th">Descripción</th>
            <th className="th">Categoría</th>
            <th className="th">Precio</th>
            <th className="th">Unidades</th>
            <th className="th">Acciones</th>
          </tr>
        </thead>

        <tbody>
          {products.map((row) => (
            <tr key={row.id} className="tr">
              <td className="td">
                <input type="checkbox" className="checkbox" />
              </td>
              <td className="td">{row.name} </td>
              <td className="td">{row.description} </td>
              <td className="td">{row.category} </td>
              <td className="td">{row.price} </td>
              <td className="td">{row.stock} </td>
              <td className="td">
                <div className="btns">
                  <button
                    className="btn"
                    onClick={() => alert(`Modificar ${row.id}`)}
                  >
                    Modificar
                  </button>
                  <button
                    className="btn"
                    onClick={(evt) => handleDelete(row.id)}
                  >
                    Eliminar
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ProductTableComponent;
