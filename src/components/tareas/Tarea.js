import React, { useContext } from "react";
import proyectoContext from "../../context/proyectos/proyectoContext";
import tareaContext from "../../context/tareas/tareaContext";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  margin: {
    margin: 1,
  },
});

const Tarea = ({ tarea }) => {
  // Extrar si un proyecto esta activo
  const proyectosContext = useContext(proyectoContext);
  const { proyecto } = proyectosContext;

  // obtener la funcion del context de tarea
  const tareasContext = useContext(tareaContext);
  const {
    eliminarTarea,
    obtenerTareas,
    cambiarEstadoTarea,
    guardarTareaActual,
  } = tareasContext;

  // extraer el proyecto
  const [proyectoActual] = proyecto;

  // funcion que se ejecuta cuando el usuario presiona el btn de eliminar tarea
  const tareaEliminar = (id) => {
    eliminarTarea(id);
    obtenerTareas(proyectoActual.id);
  };

  const cambiarEstado = (tarea) => {
    if (tarea.estado) {
      tarea.estado = false;
    } else {
      tarea.estado = true;
    }
    cambiarEstadoTarea(tarea);
  };

  // agrega un tarea actual cuando el usuario desea editarla
  const seleccionarTarea = (tarea) => {
    guardarTareaActual(tarea);
  };

  const classes = useStyles();
  return (
    <li className="tarea sombra">
      <p>{tarea.nombre} </p>

      <div className="estado">
        {tarea.estado ? (
          <Button
            type="button"
            variant="contained"
            onClick={() => cambiarEstado(tarea)}
            className={classes.margin}
          >
            > Completo
          </Button>
        ) : (
          <Button
            type="button"
            variant="contained"
            onClick={() => cambiarEstado(tarea)}
          >
            Incompleto
          </Button>
        )}
      </div>

      <div className="acciones">
        <Button
          onClick={() => seleccionarTarea(tarea)}
          type="button"
          variant="outlined"
        >
          Editar
        </Button>

        <Button
          onClick={() => tareaEliminar(tarea)}
          type="button"
          variant="outlined"
          color="secondary"
        >
          Eliminar
        </Button>
      </div>
    </li>
  );
};

export default Tarea;
