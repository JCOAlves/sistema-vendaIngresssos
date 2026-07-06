import ConectionBD from "../Config/ConexaoBD.js";
import { DataTypes } from "sequelize";

// Modelo Sequelize de evento
const Evento = ConectionBD.define("Evento", {
    ID_evento: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    // ...

    }, 
    { freezeTableName: true, }
);