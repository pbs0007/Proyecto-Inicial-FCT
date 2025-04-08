import "./RegisterProductComponent.css";
import { useNavigate } from "react-router-dom";

function RegisterProductComponent() {
  const navigate = useNavigate();

  const handleRedirect = () => {
    navigate("/product-form");
  };

  return (
    <div className="register-container">
      <div className="register-box">
        <h2 className="register-text">¿Desea registrar un nuevo producto?</h2>
        <button className="btn" onClick={handleRedirect}>
          REGISTRAR PRODUCTO
        </button>
      </div>
    </div>
  );
}

export default RegisterProductComponent;
