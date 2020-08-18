import React, { useContext, useEffect } from "react";
import Proyecto from "./Proyecto";
import proyectoContext from "../../context/proyectos/proyectoContext";
import { TransitionGroup, CSSTransition } from "react-transition-group";
import Card from "@material-ui/core/Card";
import { makeStyles } from "@material-ui/core/styles";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles({
  root: {
    minWidth: 275,
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)",
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
});

const ListadoProyectos = () => {
  const classes = useStyles();

  // Extrar proyectos de state inicial
  const proyectosContext = useContext(proyectoContext);
  const { proyectos, obtenerProyectos } = proyectosContext;

  // Obtener proyectos cuando carga el componente
  useEffect(() => {
    obtenerProyectos();
    //eslint-disable-next-line
  }, []);

  // revisar si proyectos tiene contenido
  if (proyectos.length === 0)
    return (
      <Card className={classes.root}>
        <CardContent>
          <Typography variant="h5" component="h2">
            No hay Tareas.
          </Typography>
        </CardContent>
      </Card>
    );

  return (
    <ul className="listado-proyectos">
      <TransitionGroup>
        {proyectos.map((proyecto) => (
          <CSSTransition key={proyecto.id} timeout={200} classNames="proyecto">
            <Proyecto proyecto={proyecto} />
          </CSSTransition>
        ))}
      </TransitionGroup>
    </ul>
  );
};

export default ListadoProyectos;
