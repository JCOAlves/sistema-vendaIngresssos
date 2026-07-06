import dotenv from "dotenv";
import mysql from "mysql2";
import { Sequelize } from "sequelize";

dotenv.config();

const ConfigBD = {
    name: process.env.DataBase,
    tipe: "mysql",
    host: process.env.HostBack,
    port: process.env.PortBD,
    user: process.env.UserBD,
    pasword: process.env.PasswordBD
}

const ConectionBD = new Sequelize(ConfigBD.name, ConfigBD.user, ConfigBD.password, {
    dialect: ConfigBD.tipe,
    host: ConfigBD.host,
    port: ConfigBD.port,
    logging: false,
    pool: {
        max: 10,
        acquire: 30000,
        idle: 10000
    }
});

try {
    await ConectionBD.authenticate();
    console.log("Banco de dados MySQL conectado com sucesso");

} catch (error) {
    console.error("Erro na conexão com banco de dados MySQL: ", error.message || error);
};

export default ConectionBD;