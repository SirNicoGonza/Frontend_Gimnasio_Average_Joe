import { useState, useEffect } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import useFetch from "../../hooks/useFetch";


function RegistroAsistencias(){
    const {state} = useAuth();
    const { token, role} = state;
    const [socios, setSocios] = useState([]);
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

    const handleClickAsistenciaGym= async(id_socio) => {
        const body= JSON.stringify({
            id_socio: id_socio,
            id_actividad: null,
            tipo_asistencia: "plan"
        });

        try{
            const response= await fetch(`${import.meta.env.VITE_API_URL}/asistencias/`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        //"Authorization": `Bearer ${token}`,
                    },
                    body: body,
                }
            );
            if(!response.ok){
                throw new Error("Error al registrar la asistencia");
            }
            alert("Asistencia registrada con exito!");
            } catch (error) {
                alert(error.message)
            }
        }

    //
    if(isLoading) return <p>Cargando...</p>;
    if(isError) return <p>Error al cargar los datos de los pagos</p>;

    return (
        <div>
            <h2>Registro de Asistencias</h2>
            <div>
                <table>
                    <thead>
                        <tr>
                            <th>Apellido</th>
                            <th>Nombre</th>
                            <th>Activo</th>
                            <th>Asistencia</th>
                            <th></th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {socios.map((socio)=>(
                            <tr key={socio.id_socio}>
                                <td>{socio.apellido}</td>
                                <td>{socio.nombre}</td>
                                <td>{socio.activo}</td>
                                <td>
                                    <button onClick={()=>handleClickAsistenciaGym(socio.id_socio)}>Registrar asistencia</button>
                                </td>
                                <td>
                                    <button onClick={()=>handleClick}>Asistencia a una actividad</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default RegistroAsistencias;