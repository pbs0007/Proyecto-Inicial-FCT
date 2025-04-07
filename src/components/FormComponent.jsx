import React, { useState } from 'react';
import "./FormComponent.css";


function FormComponent(){
  const [formulario,setFormulario]= useState({
    nombre: "",
    descripcion: "",
    categoria:"",
    cantidad:"",
    precio:"", 
  })
    
             
      const categorias = ["Categoría1", "Categoría2","Categoría3","Categoría4"];
    
      const handleChange = (e) => {
        const { name, value } = e.target;
        setFormulario({ ...formulario, [name]: value });
        };
    
      const handleSubmit = (e) => {e.preventDefault()         
      };
    
      return (
        <form onSubmit={handleSubmit} className="form">
          <h2 className="h2">Registrar Producto</h2>
    
          <label className="label">
            Nombre:
            <input className="input" type="text" name="nombre" value={formulario.nombre} onChange={handleChange}/>
          </label>
    
          <label className="label">
            Descripción:
            <textarea className="textarea" name="descripcion" value={formulario.descripcion} onChange={handleChange}/>
          </label>
    
          <label className="label">
            <select className="select" name="categoria" value={formulario.categoria} onChange={handleChange}>
              <option value="">Selecciona una categoría</option> 
              {categorias.map((cat, index) => (
                <option key={index} value={cat}>{cat}</option>
              ))}
            </select>
          </label>
    
          <label className="label">
            Cantidad:
            <input className="input" type="number" name="cantidad" value={formulario.cantidad} onChange={handleChange}/>
          </label>
    
          <label className="label">
            Precio:
            <input className="input" type="number" name="precio" step="0.01" value={formulario.precio} onChange={handleChange}/>
          </label>
    
          <button type="submit" className="button">Guardar producto</button>    
         
        </form>
      );
    };
    
export default FormComponent;
