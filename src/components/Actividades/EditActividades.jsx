import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import useFetch from "../../hooks/useFetch";

function EditActividades() {
    const {id} = useParams();
    const { state } = useAuth();
    const { token } = state;
    const navigate = useNavigate();

    const [nombre, setNombre] = useState("");
    const [instructor, setInstructor]= useState("");
    const [precio, setPrecio] = useState("");
    const [hora, setHora] = useState("");
    const [dias, setDias] = useState("");
    const [cupo_max, setCupo_max] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] =useState(null);
    const [successMessage, setSuccessMessage] = useState('');

    const [{ data: actividadData, isLoading: isLoadingAct, isError: isErrorAct }, fetchAct] = useFetch(
        `${import.meta.env.VITE_API_URL}/actividades/${id}`, 
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
    
    useEffect(()=>{
        fetchAct();
    }, [id]);

    useEffect(()=> {
        if(actividadData) {
            setNombre(actividadData.nombre || "");
            setInstructor(actividadData.instructor || "");
            setHora(actividadData.hora || "");
            setDias(actividadData.dias ||"");
            setCupo_max(actividadData.cupo_max || "");
            setPrecio(actividadData.precio || "")
        }
    }, [actividadData]);

    const handleSubmit = async (e)=> {
        e.preventDefault();

        const body = JSON.stringify({
            nombre: nombre,
            instructor: instructor,
            precio: precio,
            hora: hora,
            dias: dias,
            cupo_max: cupo_max
        });

        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/actividades/${id}`,
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
                throw new Error("Error al actualizar la actividad")
            }
    
            const data= await response.json();
            setSuccessMessage(`Actividad: ${data.nombre} actualizado con éxito.`);
            navigate("/actividades");
        } catch (error) {
            setError(error.message);
        } finally {
            setIsSubmitting(false);
        }
    }

    // Mostrar carga o errores
    if (isLoadingAct) return <p>Cargando...</p>;
    if (isErrorAct) return <p>Error al cargar el plan</p>;

    return (
        <div>
            <h1>Editar Actividad</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Nombre:</label>
                    <input 
                        type="text"
                        value={nombre}
                        onChange={(e) => setNombre(e.target.value)}
                        required
                    />
                    <label>Instructor:</label>
                    <input 
                        type="text"
                        value={instructor}
                        onChange={(e) => setInstructor(e.target.value)}
                        required
                    />
                    <label>Hora:</label>
                    <input 
                        type="time"
                        value={hora}
                        onChange={(e) => setHora(e.target.value)}
                        required
                    />
                    <label>Dias:</label>
                    <input 
                        type="text"
                        value={dias}
                        onChange={(e) => setDias(e.target.value)}
                        required
                    />
                    <label>Cupo maximo:</label>
                    <input 
                        type="number"
                        value={cupo_max}
                        onChange={(e) => setCupo_max(e.target.value)}
                        required
                    />
                    <label>Precio:</label>
                    <input 
                        type="number"
                        value={precio}
                        onChange={(e) => setPrecio(e.target.value)}
                        required
                    />
                </div>
                <button type="submit" disabled={isSubmitting}>
                    {isSubmitting? "Enviando...": "Actualizar"}
                </button>
                <button type="button" onClick={() => navigate("/actividades")}>Salir</button>
            </form>
        </div>
    );
}

export default EditActividades;