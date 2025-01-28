import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import useFetch from "../../hooks/useFetch";

function NewPlan() {
    const { token } = useAuth(); // Llama a useAuth como una función
    const navigate = useNavigate();
    const [nombre, setNombre] = useState('');
    const [precio, setPrecio] = useState('');
    const [descripcion, setDescripcion] = useState('');
    const [dias_mes, setDiasMes] = useState('');
    const [gracia, setGracia] = useState('');
    const [{ data, isError, isLoading }, doFetch] = useFetch(`${import.meta.env.VITE_API_URL}/planes/`);

    const handleSubmit = (e) => {
        e.preventDefault();

        const body = JSON.stringify({
            nombre: nombre,
            precio: precio,
            descripcion: descripcion,
            dias_mes: dias_mes,
            gracia: gracia,
        });

        console.log(body);

        doFetch({
            method: 'POST',
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json', // Envía los datos como JSON
            },
            body: body, // Envía el cuerpo como JSON
        });
    };

    // Efecto para manejar la respuesta después de la creación del plan
    useEffect(() => {
        if (data) {
            alert(`Plan ${nombre} fue creado con éxito`);
            navigate("/planes");
        }
    }, [data, navigate, nombre]);

    return (
        <div>
            <h2>Nuevo Plan</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Nombre del plan:</label>
                    <input 
                        type="text"
                        value={nombre}
                        onChange={(e) => setNombre(e.target.value)}
                        required 
                    />
                    <label>Precio:</label>
                    <input 
                        type="number"
                        value={precio}
                        onChange={(e) => setPrecio(e.target.value)}
                        required 
                    />
                    <label>Descripción:</label>
                    <textarea
                        value={descripcion}
                        onChange={(e) => setDescripcion(e.target.value)}
                        required
                    />
                    <label>Día de Vencimiento:</label>
                    <input 
                        type="number"
                        value={dias_mes}
                        onChange={(e) => setDiasMes(e.target.value)}
                        required
                    />
                    <label>Días de gracia:</label>
                    <input 
                        type="number"
                        value={gracia}
                        onChange={(e) => setGracia(e.target.value)}
                        required
                    />
                </div>
                <button type="submit" disabled={isLoading}>
                    {isLoading ? "Enviando..." : 'Crear plan'}
                </button>
                <button type="button" onClick={() => navigate("/planes")}>Salir</button>
                {isError && <p style={{ background: 'red' }}>No se pudo crear el plan.</p>}
            </form>
        </div>
    );
}

export default NewPlan;