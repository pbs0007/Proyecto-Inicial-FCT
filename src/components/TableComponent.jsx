import React, { useState } from "react";
import "./TableComponent.css";

function DataTable(){
  const pageSize = 10;
  const [currentPage, setCurrentPage] = useState(1);

  const data = Array.from({ length: 50 }, (_, index) => ({
    id: index + 1,
    col1: `Nombre ${index + 1}`,
    col2: `Descripcion ${index + 1}`,
    col3: `Precios ${index + 1}`,
    col4: `Cantidades ${index + 1}`,
  }));

  const handlePageChange = (newPage) => {setCurrentPage(newPage);};

  const displayedData = data.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  return (
    <div>
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
              <td className="td"><input type="checkbox" className="checkbox"/>{row.col1}</td>
              <td className="td">{row.col2}</td>
              <td className="td">{row.col3}</td>
              <td className="td">{row.col4}</td>
              <td className="td-button">
                <button onClick={() => alert(`Modificar ${row.id}`)} className="button">Modificar</button>
                <button onClick={() => alert(`Eliminar ${row.id}`)} className="button">Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>

        <tfoot className="foot">
         <tr className="tr">
            <button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1} className="button-A"> Anterior</button>
            <span className="span">Página {currentPage} de {Math.ceil(data.length / pageSize)}</span>
            <button onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === Math.ceil(data.length / pageSize)} className="button-S">Siguiente</button>
         </tr>
        </tfoot>

      </table>    
    </div>
  );
};

export default DataTable;
