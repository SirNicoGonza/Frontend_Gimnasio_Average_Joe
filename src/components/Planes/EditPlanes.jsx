import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import useFetch from "../../hooks/useFetch";

function EditPlan() {
  const { id } = useParams();
  const { state } = useAuth();
  const { token } = state;
  const navigate = useNavigate();

  // Estados para los campos del formulario
  const [nombre, setNombre] = useState("");
  const [precio, setPrecio] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [dias_mes, setDias_Mes]= useState("");
  const [gracia, setGracia]= useState("");
  const [error, setError] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  
  // Obtener los datos del plan actual
  const [{ data: planData, isLoading: isLoadingPlan, isError: isErrorPlan }, fetchPlan] = useFetch(
    `${import.meta.env.VITE_API_URL}/planes/${id}`, 
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  useEffect(()=>{
    fetchPlan();
  }, [id]);

  useEffect(()=> {
    if(planData) {
        setNombre(planData.nombre || "");
        setPrecio(planData.precio || "");
        setDescripcion(planData.descripcion ||"");
        setDias_Mes(planData.dias_mes ||"");
        setGracia(planData.gracia || "")
    }
  }, [planData]);

  // Enviar los datos actualizados al backend
  const handleSubmit= async (e)=>{
    e.preventDefault();

    const body = JSON.stringify({
        nombre: nombre,
        precio: precio,
        descripcion: descripcion,
        dias_mes: dias_mes,
        gracia: gracia,
    });

    try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/planes/${id}`,
            {
                method: "PUT",
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
                body: body, 
            }
        );

        if(!response.ok) {
            throw new Error("Error al actualizar el plan")
        }

        const data= await response.json();
        setSuccessMessage(`Plan ${data.nombre} actualizado con éxito.`);
        navigate("/planes");
    } catch (error) {
        setError(error.message);
    } finally {
        setIsSubmitting(false);
    }
       
  };

  // Mostrar carga o errores
  if (isLoadingPlan) return <p>Cargando...</p>;
  if (isErrorPlan) return <p>Error al cargar el plan</p>;

  return (
    <div>
      <h1>Editar Plan</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Nombre:</label>
          <input
            type="text"
            value={nombre} 
            onChange={(e) => setNombre(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Precio:</label>
          <input
            type="number"
            value={precio}
            onChange={(e) => setPrecio(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Descripción:</label>
          <textarea
            value={descripcion} 
            onChange={(e) => setDescripcion(e.target.value)}
            required
          />
        </div>
        <div>
            <label>Dia de Vencimiento</label>
            <input 
                type="text"
                value={dias_mes}
                onChange={(e) => setDias_Mes(e.target.value)}
                required
                />
        </div>
        <div>
            <label>Dias de gracia</label>
            <input
                type="number"
                value={gracia}
                onChange={(e) => setGracia(e.target.value)}
                required
                />
        </div>
        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Actualizando..." : "Actualizar"}
        </button>
        <button type="button" onClick={()=> navigate("/planes")}>Salir</button>
      </form>
    </div>
  );
}

export default EditPlan;