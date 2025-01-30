import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import useFetch from "../../hooks/useFetch";

function AsistenciasActividades() {
    const location = useLocation();
    const socio = location.state?.socio;
    const {state} = useAuth();
    const {token} = state;
    const [actividades, setActividades] = useState([]);
    const navigate = useNavigate();
    const [{data, isError, isLoading}, doFetch] = useFetch(
        `${import.meta.env.VITE_API_URL}/actividades/actxsocio/${socio.id_socio}`,
        {
            method: "GET",
            //headers: {
                //Authorization: `Bearer ${token}`,
            //    "Content-Type": "application/json",
            //},
        }
    );

    console.log("Socio: " + socio);

    if (!socio) {
        return <p>Error: No hay datos del socio.</p>;
    };

    useEffect(()=>{
        doFetch()
    }, []);

    useEffect(()=>{
        if(data?.actividades){
            setActividades(data.actividades)
        };
    }, [data]);

    console.log(actividades[0]);



    const handleAsistencias = async (id_socio, id_actividad) => {
        const confirmarAsistencias= window.confirm(`Confirma la asistencia del ${socio.nombre} ${socio.apellido}`);
        if(confirmarAsistencias) {
            const body= JSON.stringify({
                id_socio: id_socio,
                id_actividad: id_actividad,
                tipo_asistencia: "actividad"
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
    };

    const handleVolver = (e) => {
        e.preventDefault();
        navigate("/asistencias");
    };

    if(isLoading) return <p>Cargando...</p>;
    if(isError) return <p>Error al cargar los datos de los pagos</p>

        return (
            <div>
                <h2>Asistencia por actividades</h2>
                <h3>Socio: {socio.nombre} {socio.apellido}</h3>
                <div>
                    <table>
                        <thead>
                            <tr>
                                <th>Actividad</th>
                                <th>Instructor</th>
                                <th>Dias</th>
                                <th>Hora</th>
                                <th>Sesion</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {actividades.map((actividad) => (
                                <tr key={actividad.id_actividad}>
                                    <td>{actividad.actividad_name}</td>
                                    <td>{actividad.instructor}</td>
                                    <td>{actividad.dia}</td>
                                    <td>{actividad.hora}</td>
                                    <td>{actividad.sesiones}</td>
                                    <td>
                                        <button onClick={() => handleAsistencias(socio.id_socio, actividad.id_actividad)}>
                                            Registrar asistencia
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <button onClick={handleVolver}>Volver</button>
                </div>
            </div>
        );

}

export default AsistenciasActividades;