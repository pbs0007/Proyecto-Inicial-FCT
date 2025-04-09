import React, { useState } from 'react';
import { supabase } from "../supabase/supabaseClient";
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
    
      const handleSubmit = async (e) => {e.preventDefault()         
      ;

      const product = {
        name: formulario.nombre,
        description: formulario.descripcion,
        category: formulario.categoria,
        stock: parseInt(formulario.cantidad),
        price: parseFloat(formulario.precio)
      };

      console.log('Producto a insertar:', product);
  
      const { data, error } = await supabase
        .from('products')
        .insert([product]);
  
      if (error) {
        console.error('Error al guardar producto:', error);
        alert('Hubo un error al registrar el producto');
      } else {
        alert('Producto registrado con éxito');
        setFormulario({
          nombre: "",
          descripcion: "",
          categoria: "",
          cantidad: "",
          precio: "",
        });
      }
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
          Selecciona una categoría
            <select className="select" name="categoria" value={formulario.categoria} onChange={handleChange}>
              <option value="">Ninguna</option> 
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
