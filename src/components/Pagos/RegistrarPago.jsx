import { useState } from "react";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function RegistrarPago() {
    const location = useLocation();
    const socio = location.state?.socio;
    const navigate = useNavigate();

    if (!socio) {
        return <p>Error: No hay datos del socio.</p>;
    }

    const handlePago = async (e) => {
        e.preventDefault();
        const confirmarPago= window.confirm(`Confirma el pago del ${socio.plan} de ${socio.nombre} ${socio.apellido}`);
        if(confirmarPago){
            try {
                const response = await fetch(`${import.meta.env.VITE_API_URL}/pagos/${socio.id_socio}`,
                    {
                        method:"POST"
                    }
                );
                if(!response.ok) {
                    throw new Error("Error al procesar el pago");
                    }
                    alert("Pago realizado con exito!");
            } catch (error) {
                alert(error.message)
            }
        }
    };

    const handleVolver = (e)=>{
        e.preventDefault();
        navigate("/pagos");  
    }

    return (
        <div>
            <h2>Registrar Pago</h2>
            <p><strong>Nombre:</strong> {socio.nombre} {socio.apellido}</p>
            <p><strong>Plan:</strong> {socio.plan}</p>
            <p><strong>Estado:</strong> {socio.activo ? "Activo" : "Inactivo"}</p>
            <div>
                <p>Registrar el pago mansual de {socio.plan}</p>
                <button type="button" onClick={handlePago}>Registrar Pago</button>
            </div>
            <div>
                <h3>Actividades inscriptas</h3>

            </div>
            <button onClick={handleVolver}>Volver</button>
        </div>
    );
}

export default RegistrarPago;