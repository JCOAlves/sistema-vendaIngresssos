import ConectionBD from "../Config/ConexaoBD.js";
import { DataTypes } from "sequelize";
import Ingresso from "./Ingresso.js";

// Modelo Sequelize de usuário
const Usuario = ConectionBD.define("Usuario", {
    CPF: { type: DataTypes.STRING(12), allowNull: false, primaryKey: true },
    nomeUsuario: { type: DataTypes.STRING(100), allowNull: false },
    emailUsuario: { type: DataTypes.STRING(100), allowNull: false, validate: { isEmail: true } },
    dataNascimento: {
        type: DataTypes.DATEONLY, allowNull: false, validate: { isBefore: DataTypes.NOW }
    }
},
    {
        freezeTableName: true,
        timestamps: false
    }
);

const Ingresso_usuario = ConectionBD.define("Ingresso_usuario", {
    ID_relacionamento: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    quantidadeIngresso: { type: DataTypes.INTEGER, defaultValue: 1 },
    valorPago: { type: DataTypes.DECIMAL(12, 2), allowNull: false },
    dataCompra: { type: DataTypes.DATEONLY, defaultValue: DataTypes.NOW },
    formaPagamento: {
        type: DataTypes.ENUM("Dinheiro em espécie", "Cartão de Crédito", "Cartão de Debito", "Pix"),
        allowNull: false
    }
},
    {
        freezeTableName: true,
        timestamps: false
    }
);

Usuario.belongsToMany(Ingresso, { through: Ingresso_usuario });
Ingresso.belongsToMany(Usuario, { through: Ingresso_usuario });

export { Usuario, Ingresso_usuario };