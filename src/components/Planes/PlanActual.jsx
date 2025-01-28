import { useEffect, useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import useFetch from "../../hooks/useFetch";

function PlanActual() {
  const { state } = useAuth();
  const { token } = state;

  const [plan, setPlan] = useState(null);
  const navigate = useNavigate();

  const [{ data, isError, isLoading }, doFetch] = useFetch(
    `${import.meta.env.VITE_API_URL}/planes/mi_plan`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  // Llamar a la API al montar el componente
  useEffect(() => {
    doFetch();
  }, []);

  // Manejar la respuesta de la API
  useEffect(() => {
    if (data) {
      if (data.mensaje === "Aun no tiene un plan registrado") {
        setPlan(null); // No tiene plan
      } else {
        setPlan(data); // Tiene plan
      }
    }
  }, [data]);

  // Navegar a la página de pagos o elección de plan
  function handlePlanClick() {
    navigate("/pagos");
  }

  // Mostrar carga o errores
  if (isLoading) return <p>Cargando...</p>;
  if (isError) return <p>Error al cargar los datos. Por favor, intenta nuevamente más tarde.</p>;

  return (
    <div className="plancard-main">
      <h1>Tu Plan</h1>
      <div className="contenedor">
        {!plan ? (
          <p>
            No tienes un plan activo. <br /> Elige un plan para comenzar.
          </p>
        ) : (
          <>
            <h1 className="nombre">{plan.nombre}</h1>
            <p className="descripcion">{plan.descripcion}</p>
            <h3 className="precio">{plan.precio}</h3>
          </>
        )}
      </div>
      {
        plan && (
            <button onClick={handlePlanClick}>Pagar</button>
        )
      }
    </div>
  );
}

export default PlanActual;