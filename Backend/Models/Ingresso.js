import ConectionBD from "../Config/ConexaoBD.js";
import { DataTypes } from "sequelize";
import Evento from "./Evento.js";

// Modelo Sequelize de Ingresso
const Ingresso = ConectionBD.define("Ingresso", {
    ID_ingresso: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    ID_evento: { type: DataTypes.INTEGER, allowNull: false },
    precoIngresso: {
        type: DataTypes.DECIMAL(10, 2), defaultValue: 1.00, allowNull: false,
        validate: { isDecimal: true, isFloat: true }
    }

},
    {
        freezeTableName: true,
        timestamps: false
    }
);

Ingresso.belongsTo(Evento, { foreignKey: "ID_evento" });

export default Ingresso;