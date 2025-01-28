import { useNavigate } from "react-router-dom";

function CardActividades({ actividad, rol, token, onDeleteActividad }) {
    const id = actividad.id_actividad;
    const userType = rol;
    const navigate = useNavigate();

    const handleSelectActivity = async (e) =>{
        e.stopPropagation();
        const confirmarElegido= window.confirm(`¿Esta seguro de inscribirte en ${actividad.actividad_name}?`);
        if(confirmarElegido) {
            try {

                const response = await fetch(`${import.meta.env.VITE_API_URL}/actividades/inscripcion/${id}`, {
                    method: "POST",
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json",
                    }
                });
                if(!response.ok) {
                throw new Error("Error al incribirse");
                }
                alert("Inscripcion realizada exitosamente.")
            } catch (error) {
                alert(error.message)
            }
        }
    };

    const handleEditActivity = (e) => {
        e.stopPropagation();
        navigate(`/actividades/editar/${id}`);
    };

    const handleDeleteActivity = async (e) => {
        e.stopPropagation();
        const confirmarDelete = window.confirm(`¿Estás seguro de eliminar la actividad ${actividad.actividad_name}?`);
        if (confirmarDelete) {
        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/actividades/${id}`, {
                method: "DELETE",
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
            });
            if (!response.ok) {
                throw new Error("Error al eliminar.");
            }
            alert(`Actividad eliminado con éxito.`);
            onDeleteActividad(id);
        } catch (error) {
            alert(error.message);
        }
        }
    };

    return (
        <div className="cardactivity-main">
            <div>
                <h2 className="actividad-name">{actividad.actividad_name}</h2>
                <p>Instructor: {actividad.instructor}</p>
                <p>Horario: {actividad.hora}</p>
                <p>Dia: {actividad.dia}</p>
                <p>Cupo Maximo: {actividad.cupo_max}</p>
                <h3 className="precio">
                    ${Number(actividad.precio).toLocaleString("es-AR")}
                </h3>
            </div>
            <div>
                {userType=== "socio" && (
                    <button onClick={handleSelectActivity}>Inscribirse</button>
                )}

                {userType === "empleado" && (
                    <div>
                        <button onClick={handleEditActivity}>Editar</button>
                        <button onClick={handleDeleteActivity}>Eliminar</button>
                    </div>
                )}
            </div>
        </div>
    );
}

export default CardActividades;