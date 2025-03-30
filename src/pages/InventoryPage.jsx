import HeaderComponent from "../components/HeaderComponent";
import SidebarComponent from "../components/SidebarComponent";
import TableComponent from "../components/TableComponent";
import { createClient } from '@supabase/supabase-js'


function InventoryPage() {
  return (
    <div id="inventory-page">
      <HeaderComponent></HeaderComponent>
      <SidebarComponent></SidebarComponent>
      
      <div className="principal">
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
       <TableComponent></TableComponent>
       
      </div>
      </div>
    
  );
}

export default InventoryPage;
