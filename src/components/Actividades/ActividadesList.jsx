import { useEffect, useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import CardActividades from "./CardActividades";
import useFetch from "../../hooks/useFetch";

function ActividadesList() {
    const [actividades, setActividades] = useState([]);
    const {state} = useAuth();
    const { token, role, isAuthenticated } = state;
    const navigate= useNavigate();

    const [{data, isError, isLoading}, doFetch] = useFetch(
        `${import.meta.env.VITE_API_URL}/actividades`,
        {
            method: "GET"
        }
    );

    useEffect(()=> {
        doFetch();
    }, []);

    useEffect(()=> {
        if(data?.actividades){
            setActividades(data.actividades)
        }
    }, [data]);

    console.log(actividades);
    
    const handleNewActivity= (e)=>{
        e.stopPropagation();
        navigate("/actividades/newactividad");
    };

    const handleDeleteActivity= (id) => {
        setActividades((prevActividades) => prevActividades.filter((actividad) => actividad.id_actividad !== id));
    };

    //Verifica si hay carga o error
    if(isLoading) return <p>Cargando...</p>;
    if(isError) return <p>Error al cargar las actividades</p>;

    return (
        <div>
            {role === "empleado" && (
                <button onClick={handleNewActivity}>Crear actividad</button>
            )}
            { actividades.map((actividad) => (
                <CardActividades 
                    key={actividad.id_actividad}
                    actividad={actividad}
                    rol={role}
                    token={token}
                    onDeleteActividad={handleDeleteActivity}
                />
            ))}
        </div>
    );
}

export default ActividadesList;