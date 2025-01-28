import { useEffect, useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import CardPlan from "./CardPlan";
import useFetch from "../../hooks/useFetch";
import PlanActual from "./PlanActual";

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
            //const planesTransformado = data.planes.map((planArray) =>({
            //    id: planArray[0],
            //    nombre: planArray[1],
            //    precio: planArray[2],
            //    descripcion: planArray[3]
        //}));
            //setPlanes(planesTransformado);
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
        <div>
        {/* Mostrar el plan actual del socio */}
        {/*role === "socio" && (
          <div>
            <h2>Tu plan actual:</h2>
            <PlanActual />
          </div>
        )*/}
        {/*Mostrar boton de crear plan si es empleado */
        role=== "empleado" && (
          <button onClick={handleNuevoPlanClick}>nuevo plan</button>
        )
        }
        {/* Mostrar la lista de planes */}
        {planes.map((plan) => (
          <CardPlan key={plan.id_plan} plan={plan} rol={role} isAutheticated={isAuthenticated} token={token} onDeletePlan={handleDeletePlan} />
        ))}
      </div>
    );    
}

export default PlanesList;