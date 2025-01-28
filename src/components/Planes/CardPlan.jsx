import { useNavigate } from "react-router-dom";

function CardPlan({ plan, rol, isAuthenticated, token, onDeletePlan }) { 
  const id = plan.id_plan; // Asegúrate de que `id_plan` existe
  const userType = rol; // Rol del usuario
  const navigate = useNavigate();

  const handlePlanSelect =  async (e) => {
    e.stopPropagation();
    const confirmarElegido= window.confirm(`¿Esta seguro de elegir el plan ${plan.nombre}?`);
    if(confirmarElegido) {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/planes/inscripcion/${id}`, {
          method: "PATCH",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          }
        });
        if(!response.ok) {
          throw new Error("Error al elegir este plan");
        }
        alert("Plan elegido exitosamente.")
      } catch (error) {
        alert(error.message)
      }
    }
  };

  const handleEditPlan = (e) => {
    e.stopPropagation();
    navigate(`/planes/editar/${id}`);
  };

  const handleDeletePlan = async (e) => {
    e.stopPropagation();
    const confirmarDelete = window.confirm(`¿Estás seguro de eliminar el plan ${plan.nombre}?`);
    if (confirmarDelete) {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/planes/${id}`, {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });
        if (!response.ok) {
          throw new Error("Error al eliminar el plan");
        }
        alert(`Plan eliminado con éxito.`);
        onDeletePlan(id);
      } catch (error) {
        alert(error.message);
      }
    }
  };

  return (
    <div className="plancard-main">
      <div className="contenedor">
        <h1 className="nombre">{plan.nombre}</h1>
        <p className="descripcion">{plan.descripcion}</p>
        <h3 className="precio">
          ${Number(plan.precio).toLocaleString("es-AR")}
        </h3>
      </div>

      {userType === "socio" && (
        <button onClick={handlePlanSelect}>Seleccionar este plan</button>
      )}

      {userType === "empleado" && (
        <div>
          <button onClick={handleEditPlan}>Editar</button>
          <button onClick={handleDeletePlan}>Eliminar</button>
        </div>
      )}
    </div>
  );
}

export default CardPlan;
