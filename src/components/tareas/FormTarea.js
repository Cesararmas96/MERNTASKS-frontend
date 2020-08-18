import React, { useContext, useEffect, useState } from "react";
import proyectoContext from "../../context/proyectos/proyectoContext";
import tareaContext from "../../context/tareas/tareaContext";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";

const FormTarea = () => {
  // Extrar si un proyecto esta activo
  const proyectosContext = useContext(proyectoContext);
  const { proyecto } = proyectosContext;

  const tareasContext = useContext(tareaContext);
  const {
    tareaseleccionada,
    errortarea,
    agregarTarea,
    validarTarea,
    obtenerTareas,
    actualizarTarea,
    limpiarTarea,
  } = tareasContext;

  useEffect(() => {
    if (tareaseleccionada !== null) {
      guardarTarea(tareaseleccionada);
    } else {
      guardarTarea({
        nombre: "",
      });
    }
  }, [tareaseleccionada]);

  // state del formulario
  const [tarea, guardarTarea] = useState({
    nombre: "",
  });

  // extraer el nombre
  const { nombre } = tarea;

  // Si no hay proyecto seleccionado
  if (!proyecto) return null;

  // Array destructuring para extraer el proyecto actual
  const [proyectoActual] = proyecto;

  // leer los valores del form
  const handleChange = (e) => {
    guardarTarea({
      ...tarea,
      [e.target.name]: e.target.value,
    });
    console.log(e.target.value);
  };

  const onSubmit = (e) => {
    e.preventDefault();

    // validar
    if (nombre.trim() === "") {
      validarTarea();
      return;
    }

    if (tareaseleccionada === null) {
      // agregar la nueva tarea al state de tareas
      tarea.proyectoId = proyectoActual.id;
      tarea.estado = false;
      agregarTarea(tarea);
    } else {
      // actualizar tarea exitente
      actualizarTarea(tarea);

      // elimina tarea selecionada
      limpiarTarea();
    }

    // obtener y filtrar las tareas del proyecto actual
    obtenerTareas(proyectoActual.id);

    //reiniciar el form
    guardarTarea({
      nombre: "",
    });
  };
  return (
    <div>
      <form onSubmit={onSubmit} noValidate autoComplete="off">
        <TextField
          id="filled-basic"
          label="Tarea"
          variant="filled"
          name="nombre"
          placeholder="Nombre Tarea..."
          onChange={handleChange}
          fullWidth
          value={nombre}
        />

        <div className="contenedor-input">
          <Button type="submit" variant="contained" color="primary" fullWidth>
            {tareaseleccionada ? "Editar Tarea" : "Agregar Tarea"}
          </Button>
        </div>
      </form>

      {errortarea ? (
        <p className="mensaje error"> El nombre de la tarea es obligatorio </p>
      ) : null}
    </div>
  );
};

export default FormTarea;
