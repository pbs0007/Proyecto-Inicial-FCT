import React, { useEffect, useState, useMemo } from "react";
import { supabase } from "../supabase/supabaseClient";

//crear desplegable

const CategoryDropdown = ({ onSelectCategory }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [categories, setCategories] = useState([]);
    const dropdownRef = useRef(null);
  
    // Obtener categorías únicas de Supabase

  useEffect(() => {
    const fetchCategories = async () => {
      const { data, error } = await supabase
        .from('products')
        .select('category');

      if (error) {
        console.error('Error al cargar categorías:', error.message);
      } else {
        const unique = [...new Set(data.map(item => item.category))];
        setCategories(unique);
      }
    };

    fetchCategories();
  }, []);

  // Cerrar si haces clic fuera
useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative inline-block" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="px-4 py-2 bg-blue-600 text-white rounded-md"
      >
        Seleccionar categoría
      </button>

      {isOpen && (
        <div className="absolute mt-2 w-48 bg-white shadow-md rounded-md z-10">
          {categories.map((category, idx) => (
            <div
              key={idx}
              className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
              onClick={() => {
                onSelectCategory(category);
                setIsOpen(false);
              }}
            >
              {category}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CategoryDropdown;