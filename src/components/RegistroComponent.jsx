import "./RegistroComponent.css";
import { useNavigate } from 'react-router-dom';

function RegistroComponent(){

    const navigate = useNavigate();

    const handleRedirect = () => {
      navigate("/product-form")
    };
  
    return (
     <div className="Registro">
        <div className="Componentes">
             <h2 className="textoRecuadro">¿Desea registrar un nuevo producto?</h2> 
             <button className="Botonregistro" onClick={handleRedirect}>REGISTRAR PRODUCTO</button>
        </div>
     </div>
    );
  };

 
 export default RegistroComponent;