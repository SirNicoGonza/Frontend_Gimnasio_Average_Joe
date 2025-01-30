import { useState, useEffect } from "react";
import { useAuth } from "../../contexts/AuthContext";
import useFetch from "../../hooks/useFetch";


function RegistroAsistencias(){
    const {state} = useAuth();
    const { token, role} = state;
    const [socios, setSocios] = useState([]);
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

    const handleClick= (e) => {
        e.preventDefault();
        return <p>Se registro la asistencia</p>
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
                        </tr>
                    </thead>
                    <tbody>
                        {socios.map((socio)=>(
                            <tr key={socio.id_socio}>
                                <td>{socio.apellido}</td>
                                <td>{socio.nombre}</td>
                                <td>{socio.activo}</td>
                                <td>
                                    <button onClick={()=>handleClick}>Registrar asistencia</button>
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