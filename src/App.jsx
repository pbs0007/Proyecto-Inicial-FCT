import { useState } from 'react'
import { createClient } from '@supabase/supabase-js'
import './App.css'

const supabase = createClient(import.meta.env.VITE_PROJECT_URL, import.meta.env.VITE_APIKEY)
console.log(supabase)
function App() {


  return (
    <>
      <div>
        <HeaderComponent></HeaderComponent>
        <SidebarComponent></SidebarComponent>
        <div className="principal"></div>
      </div>
    </>
  );
}

export default App;
