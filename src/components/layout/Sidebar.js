import React from "react";
import NuevoProyecto from "../proyectos/NuevoProyecto";
import ListadoProyectos from "../proyectos/ListadoProyectos";

const Sidebar = () => {
    return (
        <aside>
            <div>
                <h2>Tus Proyectos</h2>
                <ListadoProyectos />
                <NuevoProyecto />
            </div>
        </aside>
    );
};

export default Sidebar;
