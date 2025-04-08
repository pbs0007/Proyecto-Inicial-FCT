import React, { useEffect, useState } from 'react';
import { supabase } from '../supabaseClient';


//mostrar productos filtrados 

const ProductList = ({ category }) => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    if (!category) return;

    const fetchProducts = async () => {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .eq('category', category);

      if (error) {
        console.error('Error al cargar productos:', error.message);
      } else {
        setProducts(data);
      }
    };

    fetchProducts();
  }, [category]);

  return (
    <div className="mt-4">
      <h2 className="text-lg font-semibold mb-2">
        Productos en: <span className="text-blue-600">{category}</span>
      </h2>
      {products.length === 0 ? (
        <p>No hay productos en esta categoría.</p>
      ) : (
        <ul className="space-y-2">
          {products.map((product) => (
            <li key={product.id} className="border p-2 rounded-md">
              {product.name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ProductList;