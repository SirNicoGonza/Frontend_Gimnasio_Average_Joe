import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import useFetch from "../../hooks/useFetch";

function NewActividad() {
    const {token} = useAuth();
    const navigate = useNavigate();
    const [nombre, setNombre] = useState("");
    const [instructor, setInstructor]= useState("");
    const [precio, setPrecio] = useState("");
    const [hora, setHora] = useState("");
    const [dias, setDias] = useState("");
    const [cupo_max, setCupo_max] = useState("");
    const [sesiones, setSesiones] = useState("");
    const [{data, isError, isLoading}, doFetch] = useFetch(`${import.meta.env.VITE_API_URL}/actividades/`);

    const handleSubmit= (e) => {
        e.preventDefault();

        const body = JSON.stringify({
            nombre: nombre,
            instructor: instructor,
            precio: precio,
            hora: hora,
            dias: dias,
            cupo_max: cupo_max,
            cupo_disp: cupo_max,
            sesiones: sesiones
        });

        doFetch({
            method: 'POST',
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
            body: body,
        });
    };

    useEffect(()=> {
        if(data){
            alert(`Actividad: ${nombre} se creo con exito!`);
            navigate("/actividades");
        }
    }, [data, navigate, nombre]);

    return (
        <div>
            <h2>Nueva Actividad</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Nombre de la actividad:</label>
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
                    <label>Dia:</label>
                    <input 
                        type="text"
                        value={dias}
                        onChange={(e) => setDias(e.target.value)}
                        required
                    />
                    <label>Sesiones: </label>
                    <input
                        type="number"
                        value={sesiones}
                        onChange={(e) => setSesiones(e.target.value)}
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
                <button type="submit" disabled={isLoading}>
                    {isLoading? "Enviando...": "Crear"}
                </button>
                <button type="button" onClick={() => navigate("/actividades")}>Salir</button>
                {isError && <p style={{ background: 'red' }}>No se pudo crear la actividad.</p>}
            </form>
        </div>
    );

};

export default NewActividad;