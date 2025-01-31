import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import useFetch from "../../hooks/useFetch";
import './RegistrarPago.css';

function RegistrarPago() {
    const location = useLocation();
    const socio = location.state?.socio;
    const navigate = useNavigate();
    const [actividades, setActividades] = useState([]); 
    const [{ data, isError, isLoading }, doFetch] = useFetch(
        `${import.meta.env.VITE_API_URL}/actividades/actxsocio/${socio.id_socio}`,
        {
            method: "GET",
        }
    );

    if (!socio) {
        return <p>Error: No hay datos del socio.</p>;
    }

    useEffect(() => {
        doFetch();
    }, []);

    useEffect(() => {
        if (data) {
            if (data.actividades) {
                setActividades(data.actividades);
            } else if (data.mensaje) {
                setActividades([]);
            }
        }
    }, [data]);

    const handlePago = async (e) => {
        e.preventDefault();
        const confirmarPago = window.confirm(`Confirma el pago del ${socio.plan} de ${socio.nombre} ${socio.apellido}`);
        if (confirmarPago) {
            try {
                const response = await fetch(`${import.meta.env.VITE_API_URL}/pagos/${socio.id_socio}`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                });
                if (!response.ok) {
                    throw new Error("Error al procesar el pago");
                }
                alert("Pago realizado con éxito!");
            } catch (error) {
                alert(error.message);
            }
        }
    };

    const handlePagoActividad = async (id_actividad, actividad_name) => {
        const confirmarPago = window.confirm(`Confirma el pago de la Actividad ${actividad_name} de ${socio.nombre} ${socio.apellido}`);
        if (confirmarPago) {
            try {
                const response = await fetch(`${import.meta.env.VITE_API_URL}/pagos/${socio.id_socio}/${id_actividad}`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                });
                if (!response.ok) {
                    throw new Error("Error al procesar el pago");
                }
                alert("Pago realizado con éxito!");
            } catch (error) {
                alert(error.message);
            }
        }
    };

    const handleVolver = (e) => {
        e.preventDefault();
        navigate("/pagos");
    };

    // En caso de Error o Loading
    if (isLoading) return <p>Cargando...</p>;
    if (isError) return <p>Error al cargar los datos de los pagos</p>;

    return (
        <div className="main-registrar-pago">
            <h2>Registrar Pago</h2>
            <p><strong>Nombre:</strong> {socio.nombre} {socio.apellido}</p>
            <p><strong>Plan:</strong> {socio.plan}</p>
            <p><strong>Estado:</strong> {socio.activo ? "Activo" : "Inactivo"}</p>
            <div>
                <p>Registrar el pago mensual de {socio.plan}</p>
                <button type="button" onClick={handlePago}>Registrar Pago</button>
            </div>
            <div>
                <h3>Actividades inscriptas</h3>
                <table className="tabla-registro">
                    <thead>
                        <tr>
                            <th>Nombre</th>
                            <th>Instructor</th>
                            <th>Dias</th>
                            <th>Horas</th>
                            <th>Sesiones</th>
                            <th>Precio</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {actividades.length > 0 ? (
                            actividades.map((actividad) => (
                                <tr key={actividad.id_actividad}>
                                    <td>{actividad.actividad_name}</td>
                                    <td>{actividad.instructor}</td>
                                    <td>{actividad.dia}</td>
                                    <td>{actividad.hora}</td>
                                    <td>{actividad.sesiones}</td>
                                    <td>{actividad.precio}</td>
                                    <td>
                                        <button className="btn-registrar-pago" onClick={() => handlePagoActividad(actividad.id_actividad, actividad.actividad_name)}>
                                            Registrar Pago
                                        </button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="7">No hay actividades registradas para este socio.</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
            <button className="btnvolver" onClick={handleVolver}>Volver</button>
        </div>
    );
}

export default RegistrarPago; 