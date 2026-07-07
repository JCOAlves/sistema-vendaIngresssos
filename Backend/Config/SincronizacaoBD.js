import "../Models/Evento.js";
import "../Models/Ingresso.js";
import "../Models/Usuario.js";
import Evento from "../Models/Evento.js";
import Ingresso from "../Models/Ingresso.js";
import { Ingresso_usuario, Usuario } from "../Models/Usuario.js";

// Sincronização de modelos do banco de dados
async function SincronizacaoBD() {
    try {
        await Evento.sync();
        await Ingresso.sync();
        await Usuario.sync();
        await Ingresso_usuario.sync();
        console.log("Modelos Sequelize sincronizados com sucesso");
        
    } catch (error) {
        console.error("Erro na sincronização dos modelos Sequelize: ", error.message || error);
    };
};

export default SincronizacaoBD;