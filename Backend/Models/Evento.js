import ConectionBD from "../Config/ConexaoBD.js";
import { DataTypes } from "sequelize";

// Modelo Sequelize de evento
const Evento = ConectionBD.define("Evento", {
    ID_evento: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    nomeEvento: { type: DataTypes.STRING(120), allowNull: false, unique: true },
    localEvento: { type: DataTypes.STRING(120), allowNull: false },
    dataInicio: { type: DataTypes.DATEONLY, allowNull: false },
    dataFim: { type: DataTypes.DATEONLY, allowNull: false },
    horaInicio: { type: DataTypes.TIME, allowNull: false },
    horaFim: { type: DataTypes.TIME, allowNull: false },
    limiteIngressos: { type: DataTypes.INTEGER, allowNull: false },
    ingressos_pessoas: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 1 }
},
    { 
        freezeTableName: true,
        timestamps: false
    }
);

export default Evento;