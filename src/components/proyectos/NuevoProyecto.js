import React, { Fragment, useState, useContext } from "react";
import proyectoContext from "../../context/proyectos/proyectoContext";

import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

const NuevoProyecto = () => {
    // Obtener el state del formulario
    const proyectosContext = useContext(proyectoContext);
    const {
        formulario,
        errorformulario,
        mostrarFormulario,
        agregarProyecto,
        mostrarError,
    } = proyectosContext;

    // State para Proyecto
    const [proyecto, guardarProyecto] = useState({
        nombre: "",
    });

    // Extraer nombre de proyecto
    const { nombre } = proyecto;

    // Lee los contenidos del input
    const onChangeProyecto = (e) => {
        guardarProyecto({
            ...proyecto,
            [e.target.name]: e.target.value,
        });
    };

    // Cuando el usuario envia un proyecto
    const onSubmitProyecto = (e) => {
        e.preventDefault();

        // Validar el proyecto
        if (nombre === "") {
            mostrarError();
            return;
        }

        // agregar al state
        agregarProyecto(proyecto);

        // Reiniciar el form
        guardarProyecto({
            nombre: "",
        });
    };

    // Mostrar el formulario
    const onClickFormulario = () => {
        mostrarFormulario();
    };

    return (
        <Fragment>
            <Button
                type="button"
                variant="contained"
                color="primary"
                fullWidth
                onClick={onClickFormulario}
            >
                Nuevo Proyecto
            </Button>

            {formulario ? (
                <form
                    className="formulario-nuevo-proyecto"
                    onSubmit={onSubmitProyecto}
                    noValidate
                    autoComplete="off"
                >
                    <TextField
                        id="outlined-basic"
                        label="Nombre del Proyecto"
                        variant="outlined"
                        onChange={onChangeProyecto}
                        value={nombre}
                        name="nombre"
                        fullWidth
                    />

                    <Button
                        type="submit"
                        variant="outlined"
                        color="primary"
                        fullWidth
                    >
                        Agregar Proyecto
                    </Button>
                </form>
            ) : null}

            {errorformulario ? (
                <p className="mensaje error">
                    El nombre del Proyecto es obligatorio
                </p>
            ) : null}
        </Fragment>
    );
};

export default NuevoProyecto;
