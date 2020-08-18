import React, { Fragment, useContext } from "react";
import Tarea from "./Tarea";
import proyectoContext from "../../context/proyectos/proyectoContext";
import tareaContext from "../../context/tareas/tareaContext";
import { TransitionGroup, CSSTransition } from "react-transition-group";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

const ListadoTareas = () => {
  // Extrar proyectos de state inicial
  const proyectosContext = useContext(proyectoContext);
  const { proyecto, eliminarProyecto } = proyectosContext;

  const tareasContext = useContext(tareaContext);
  const { tareasproyecto } = tareasContext;

  // Si no hay proyecto seleccionado
  if (!proyecto) return <h2>Selecciona un proyecto</h2>;

  // Array destructuring para extraer el proyecto actual
  const [proyectoActual] = proyecto;

  // Elimina un proyecto
  const onClickEliminar = () => {
    eliminarProyecto(proyectoActual.id);
  };

  return (
    <Fragment>
      <Typography variant="h2">Proyecto: {proyectoActual.nombre}</Typography>

      <ul className="listado-tareas">
        {tareasproyecto.length === 0 ? (
          <li className="tarea">
            <p>No hay tareas</p>
          </li>
        ) : (
          <TransitionGroup>
            {tareasproyecto.map((tarea) => (
              <CSSTransition timeout={200} classNames="tarea" key={tarea.id}>
                <Tarea tarea={tarea} />
              </CSSTransition>
            ))}
          </TransitionGroup>
        )}
      </ul>

      <Button
        type="button"
        variant="outlined"
        color="secondary"
        onClick={onClickEliminar}
      >
        Eliminar Proyecto &times;
      </Button>
    </Fragment>
  );
};

export default ListadoTareas;
