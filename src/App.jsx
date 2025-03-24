import { useState } from 'react'
import { createClient } from '@supabase/supabase-js'
import './App.css'

const supabase = createClient(import.meta.env.VITE_PROJECT_URL, import.meta.env.VITE_APIKEY)
console.log(supabase)
function App() {


  return (
    <>
      <div>
        <h1>
          Gestión de inventario
        </h1>
      </div>
    </>
  )
}

export default App
