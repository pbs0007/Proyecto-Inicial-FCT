import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { supabase } from "../supabase/supabaseClient";
import "./FormComponent.css";


function FormComponent(){
  const { id } = useParams();
  const navigate = useNavigate();

  const [formulario,setFormulario]= useState({
    nombre: "",
    descripcion: "",
    categoria:"",
    cantidad:"",
    precio:"", 
  });
    
             
      const categorias = [
        "Aperitivo",
        "Agua y refrescos",
        "Lacteos",
        "Frutas y verduras",
        "Huevos y mantequilla",
        "Aceite, especias y salsas",
        "Marisco y pescado",
        "Carne",
        "Congelados"
      ];
    
      const handleChange = (e) => {
        const { name, value } = e.target;
        setFormulario({ ...formulario, [name]: value });
        };

        useEffect(() => {
          if (id) {
            const fetchProduct = async () => {
              const { data, error } = await supabase
                .from("products")
                .select("*")
                .eq("id", id)
                .single();
      
              if (error) {
                console.error("Error al cargar producto:", error);
              } else {
                setFormulario({
                  nombre: data.name || "",
                  descripcion: data.description || "",
                  categoria: data.category || "",
                  cantidad: data.stock?.toString() || "",
                  precio: data.price?.toString() || "",
                });
              }
            };
      
            fetchProduct();
          }
        }, [id]);
      
    
      const handleSubmit = async (e) => {e.preventDefault();
  
        const product = {
          name: formulario.nombre,
          description: formulario.descripcion,
          category: formulario.categoria,
          stock: parseInt(formulario.cantidad),
          price: parseFloat(formulario.precio)
        };
  
        if (id) {
          const { error } = await supabase
            .from("products")
            .update(product)
            .eq("id", id);
    
          if (error) {
            console.error("Error al actualizar producto:", error);
            alert("Error al actualizar el producto");
          } else {
            alert("Producto actualizado con éxito");
            navigate("/inventory");
          }
        } else {
    
        const { error } = await supabase
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
    
          <button type="submit" className="button">
            {id ? "Actualizar producto" : "Guardar producto"}
            </button>    
         
        </form>
      );
    };
    
export default FormComponent;
