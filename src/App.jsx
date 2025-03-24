import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import { createClient } from '@supabase/supabase-js'
import './App.css'

const supabase = createClient(import.meta.env.VITE_PROJECT_URL, import.meta.env.VITE_APIKEY)
console.log(supabase)
function App() {
  const [count, setCount] = useState(0)

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
