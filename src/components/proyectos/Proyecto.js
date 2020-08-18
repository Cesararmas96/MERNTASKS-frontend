import React, { useContext } from "react";
import proyectoContext from "../../context/proyectos/proyectoContext";
import tareaContext from "../../context/tareas/tareaContext";
import Button from "@material-ui/core/Button";

const Proyecto = ({ proyecto }) => {
    // Obtener el state de proyectos
    const proyectosContext = useContext(proyectoContext);
    const { proyectoActual } = proyectosContext;

    // obtener la función del context de tarea
    const tareasContext = useContext(tareaContext);
    const { obtenerTareas } = tareasContext;

    // Función para agregar el proyecto actual
    const seleccionarProyecto = (id) => {
        proyectoActual(id); // Fijar un proyecto actual
        obtenerTareas(id); // Filtrar las tareas cuando se de click
    };

    return (
        <li>
            <Button
                type="button"
                fullWidth
                onClick={() => seleccionarProyecto(proyecto.id)}
            >
                {proyecto.nombre}
            </Button>
        </li>
    );
};

export default Proyecto;
