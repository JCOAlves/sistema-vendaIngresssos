import { Usuario, Ingresso_usuario } from "../Models/Usuario.js";
import Evento from "../Models/Evento.js";
import Ingresso from "../Models/Ingresso.js";
import RespostaHTTP from "../Config/RespostaHTTP.js";

const listaUsuarios = async (req, res) => {
    try {
        
    } catch (error) {
        const Resposta = new RespostaHTTP(false, "Erro na listagem de usuários", error.message || error);
        Resposta.ExibeMensagem("Erro");
        return res.status(500).json(Resposta);
    };
};

const listaUsuarioID = async (req, res) => {
    try {
        
    } catch (error) {
        const Resposta = new RespostaHTTP(false, "Erro na listagem de usuário por ID", error.message || error);
        Resposta.ExibeMensagem("Erro");
        return res.status(500).json(Resposta);
    };
};

const cadastraUsuario = async (req, res) => {
    try {
        
    } catch (error) {
        const Resposta = new RespostaHTTP(false, "Erro no cadastro de novo usuário", error.message || error);
        Resposta.ExibeMensagem("Erro");
        return res.status(500).json(Resposta);
    };
};

const atualizaUsuario = async (req, res) => {
    try {
        
    } catch (error) {
        const Resposta = new RespostaHTTP(false, "Erro na atualização de dados de usuário", error.message || error);
        Resposta.ExibeMensagem("Erro");
        return res.status(500).json(Resposta);
    };
};

const deletaUsuario = async (req, res) => {
    try {
        
    } catch (error) {
        const Resposta = new RespostaHTTP(false, "Erro na exclusão de usuário do sistema", error.message || error);
        Resposta.ExibeMensagem("Erro");
        return res.status(500).json(Resposta);
    };
};

export { listaUsuarios, listaUsuarioID, cadastraUsuario, atualizaUsuario, deletaUsuario };