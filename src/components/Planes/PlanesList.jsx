import { useEffect, useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import CardPlan from "./CardPlan";
import useFetch from "../../hooks/useFetch";
import "./PlanesList.css";

function PlanesList() {
    const [planes, setPlanes] = useState([]);
    const {state} = useAuth()
    const {token, role, isAuthenticated} = state
    const navigate = useNavigate();

    const [{data, isError, isLoading}, doFetch] = useFetch(
        `${import.meta.env.VITE_API_URL}/planes`,
        {
            method: "GET",
            //headers: {
            //    Authorization: `Bearer ${token}`,
            //},
        }
    );

    useEffect(()=> {
        doFetch();
    }, []);

    useEffect(()=> {
        if(data?.planes) {
          setPlanes(data.planes)
        }
    }, [data]);

    const handleNuevoPlanClick= (e)=>{
      e.stopPropagation();
      navigate('/planes/newplan');
    }

    const handleDeletePlan = (id) => {
      setPlanes((prevPlanes) => prevPlanes.filter((plan) => plan.id_plan !== id));
    };

    //Verifica si hay carga o error
    if(isLoading) return <p>Cargando...</p>;
    if(isError) return <p>Error al cargar los planes</p>;

    return (
      <div className="planeslist-container">
        {/* Mostrar botón solo si el usuario es empleado */}
        {role === "empleado" && (
          <button className="btn-nuevo" onClick={handleNuevoPlanClick}>
              Nuevo Plan
          </button>
        )}

        <div className="planeslist-grid">
            {planes.map((plan) => (
                <CardPlan
                  key={plan.id_plan}
                  plan={plan}
                  rol={role}
                  isAuthenticated={isAuthenticated}
                  token={token}
                  onDeletePlan={handleDeletePlan}
                />
            ))}
        </div>
      </div>
    );    
}

export default PlanesList;