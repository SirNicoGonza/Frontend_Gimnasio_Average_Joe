import { useState, useEffect } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import useFetch from "../../hooks/useFetch";
//import "./Pagos.css";

function Pagos() {
    const [socios, setSocios] = useState([]);
    const [socioLog, setSocioLog] = useState([]);
    const {state} = useAuth();
    const {token, role, isAuthenticated} = state;
    const navigate = useNavigate();
    const [{data, isError, isLoading}, doFetch] = useFetch(`${import.meta.env.VITE_API_URL}/user/socios`,
        {
            method: "GET"
        }
    );

    if(role== "empleado"){
        useEffect(()=>{
            doFetch();
        }, []);

        useEffect(()=> {
            if(data?.actividades){
                setSocios(data.actividades)
            }
        }, [data]);
    };


    const [{data:dataSocio, isError: isErrorSocio, isLoading: isLoadingSocio}, doFetchSocio] = useFetch(`${import.meta.env.VITE_API_URL}/pagos/socio`,
                    {
                        method: "GET",
                        headers: {
                            Authorization: `Bearer ${token}`,
                            "Content-Type": "application/json",
                        }
    });

    if(role == "socio"){
        useEffect(()=> {
            doFetchSocio();
        }, []);

        useEffect(()=> {
            if(dataSocio?.pagos){
                setSocioLog(dataSocio.pagos);
            }
        }, [dataSocio]);        
    };


    const handleClick = (socio) => {
        navigate(`/pagos/registrar-pago`, { state: { socio } });
    };

    //Verifica si hay carga o error
    if( role ==="Empledo"){
        if(isLoading) return <p>Cargando...</p>;
        if(isError) return <p>Error al cargar los datos de los pagos</p>;
    } else {
        if(isLoadingSocio) return <p>Cargando...</p>;
        if(isErrorSocio) return <p>Error al cargar los datos</p>
    }

    
    return (
        <div>
            <div>
                {role ==="empleado" && (
                    <h2>Listado de Socios</h2>
                )}
            </div>
            {role === "socio" && (
                <h2>Lista de Pagos</h2>
            )}
            {role === "empleado" && (
                 <table>
                 <thead>
                     <tr>
                         <th>Apellido</th>
                         <th>Nombre</th>
                         <th>Plan</th>
                         <th>Activo</th>
                         <th></th>
                     </tr>
                 </thead>
                 <tbody>
                     {socios.map((socio) =>(
                         <tr key={socio.id_socio}>
                             <td>{socio.apellido}</td>
                             <td>{socio.nombre}</td>
                             <td>{socio.plan}</td>
                             <td>{socio.activo}</td>
                             <td>
                                <button onClick={() => handleClick(socio)}>Seleccionar</button>
                             </td>
                         </tr>
                     ))}
                 </tbody>
             </table>
            )}
            {role=== "socio" &&(
                <table>
                <thead>
                    <tr>
                        <th>Fecha de pago</th>
                        <th>Plan</th>
                    </tr>
                </thead>
                <tbody>
                    {socioLog.map((socio)=>(
                        <tr key={socio.id_pago}>
                            <td>
                                {new Intl.DateTimeFormat("es-ES", {
                                    weekday: "short",
                                    day: "2-digit",
                                    month: "short",
                                    year: "numeric",
                                    hour: "2-digit",
                                    minute: "2-digit",
                                    second: "2-digit",
                                    timeZone: "America/Argentina/Buenos_Aires",
                                })
                                .format(new Date(socio.fecha_pago))
                                .replace(/^\w/, (c) => c.toUpperCase())}
                            </td>
                            <td>{socio.nombre_plan}</td>
                        </tr>
                    ))}
                </tbody>
                </table>
            )}
        </div>
    );
};

export default Pagos;