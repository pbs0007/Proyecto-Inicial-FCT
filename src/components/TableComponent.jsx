import React, { useEffect, useState, useMemo } from "react";
import { supabase } from "../supabase/supabaseClient";
import "./TableComponent.css";

function DataTable(){
  const pageSize = 10;
  const [currentPage, setCurrentPage] = useState(1);
  const [products, setProducts] = useState([])
  const handlePageChange = (newPage) => {setCurrentPage(newPage);};

  const displayedData = useMemo(() => products.slice((currentPage - 1) * pageSize, currentPage * pageSize), [products, currentPage, pageSize]);

  useEffect(() => {
    const fetchProducts = async () => {
      const { data, error } = await supabase
        .from('products')
        .select("id, name, description, price, stock") // Recordar que no he añadido la categoria del producto porque no esta en el html abajo

      if (error) {
        console.error('Error al traer productos:', error)
      } else {
        setProducts(data)
      }
    }

    fetchProducts()
  }, [])

  const handleDelete = async (id) => {
    const confirm = window.confirm('¿Seguro que deseas eliminar este producto?')

    if (!confirm) return

    const { error } = await supabase.from('products').delete().eq('id', id)

    if (error) {
      console.error('Error al eliminar:', error.message)
      alert('Hubo un error al eliminar el producto.')
    } else {
      setProducts(products.filter((producto) => producto.id !== id))
      alert('Producto eliminado correctamente.')
    }
  }

  return (
    <div>
      <h1 className="TodosProductos">Todos los Productos</h1>
      <table className="table">

        <thead>
          <tr className="tr">
            <th className="th">Nombre</th>
            <th className="th">Descripción</th>
            <th className="th">Precio</th>
            <th className="th">Stock</th>            
          </tr>
        </thead>

        <tbody>
          {displayedData.map((row) => (
            <tr key={row.id} className="tr">
              <td className="td"><input type="checkbox" className="checkbox"/>{row.name}</td>
              <td className="td">{row.description}</td>
              <td className="td">{row.price}</td>
              <td className="td">{row.stock}</td>
              <td className="td-button">
                <button onClick={() => alert(`Modificar ${row.id}`)} className="button">Modificar</button>
                <button onClick={(evt) => handleDelete(row.id)} className="button">Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>

        <tfoot className="foot">
         <tr className="tr">
            <td>
            <button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1} className="button-A"> Anterior</button>
            </td>

            <td>
              <span className="span">Página {currentPage} de {Math.ceil(products.length / pageSize)}</span>
            </td>
            <td>
              <button onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === Math.ceil(products.length / pageSize)} className="button-S">Siguiente</button>
            </td>
         </tr>
        </tfoot>

      </table>    
    </div>
  );
};

export default DataTable;
