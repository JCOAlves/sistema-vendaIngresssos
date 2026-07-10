import { Usuario, Ingresso_usuario } from "../Models/Usuario.js";
import Evento from "../Models/Evento.js";
import Ingresso from "../Models/Ingresso.js";
import RespostaHTTP from "../Config/RespostaHTTP.js";

const listaUsuarios = async (req, res) => {
    try {
        const { filtro, tipoFiltro = "" } = req.query;

        let lista_usuarios = await Usuario.findAll({ order: [["CPF", "ASC"]] });

        if (filtro) {
            switch (tipoFiltro) {
                case "nomeUsuario":
                    lista_usuarios = lista_usuarios.filter(a => a.dataValues.nomeUsuario.startsWith(filtro));
                    break;

                case "emailUsuario":
                    lista_usuarios = lista_usuarios.filter(a => a.dataValues.emailUsuario.startsWith(filtro));
                    break;
            };
        };

        if (lista_usuarios.length > 0) {
            const Resposta = new RespostaHTTP(true, "Usuários listados com sucesso", null, lista_usuarios);
            Resposta.ExibeMensagem();
            return res.status(200).json(Resposta);

        } else {
            const Resposta = new RespostaHTTP(false, "Não há usuários cadastrados ou usuários não encontrados");
            Resposta.ExibeMensagem("Erro");
            return res.status(404).json(Resposta);
        };

    } catch (error) {
        const Resposta = new RespostaHTTP(false, "Erro na listagem de usuários", error.message || error);
        Resposta.ExibeMensagem("Erro");
        return res.status(500).json(Resposta);
    };
};

const listaUsuarioID = async (req, res) => {
    try {
        const { ID } = req.params;

        if (!ID) {
            const Resposta = new RespostaHTTP(false, "ID de usuário não fornecido ou invalido");
            Resposta.ExibeMensagem("Erro");
            return res.status(400).json(Resposta);
        };

        const UsuarioID = await Usuario.findByPk(ID);
        if (UsuarioID) {
            const Resposta = new RespostaHTTP(true, "Usuários listados com sucesso", null, UsuarioID);
            Resposta.ExibeMensagem();
            return res.status(200).json(Resposta);

        } else {
            const Resposta = new RespostaHTTP(false, "Não há cadastrado usuário relacionado ao ID ou usuário não encontrado");
            Resposta.ExibeMensagem("Erro");
            return res.status(404).json(Resposta);
        }

    } catch (error) {
        const Resposta = new RespostaHTTP(false, "Erro na listagem de usuário por ID", error.message || error);
        Resposta.ExibeMensagem("Erro");
        return res.status(500).json(Resposta);
    };
};

const cadastraUsuario = async (req, res) => {
    try {
        const { CPF, nomeUsuario, emailUsuario, dataNascimento } = req.body;

        if (!CPF) {
            const Resposta = new RespostaHTTP(false, "CPF de usuário não fornecido ou invalido");
            Resposta.ExibeMensagem("Erro");
            return res.status(400).json(Resposta);
        };

        if (!nomeUsuario) {
            const Resposta = new RespostaHTTP(false, "Nome de usuário não fornecido ou invalido");
            Resposta.ExibeMensagem("Erro");
            return res.status(400).json(Resposta);
        };

        if (!emailUsuario) {
            const Resposta = new RespostaHTTP(false, "Endereço de email não fornecido ou invalido");
            Resposta.ExibeMensagem("Erro");
            return res.status(400).json(Resposta);
        };

        if (!dataNascimento) {
            const Resposta = new RespostaHTTP(false, "Data de nascimento de usuário não fornecido ou invalido");
            Resposta.ExibeMensagem("Erro");
            return res.status(400).json(Resposta);
        };

        const dadosUsuario = {
            CPF: CPF,
            nomeUsuario: nomeUsuario,
            emailUsuario: emailUsuario,
            dataNascimento: dataNascimento
        };

        const UsuarioCadastrado = await Usuario.create(dadosUsuario);
        if (UsuarioCadastrado) {
            const Resposta = new RespostaHTTP(true, "Novo usuário cadastrado com sucesso", null, UsuarioCadastrado);
            Resposta.ExibeMensagem();
            return res.status(201).json(Resposta);
        };

    } catch (error) {
        const Resposta = new RespostaHTTP(false, "Erro no cadastro de novo usuário", error.message || error);
        Resposta.ExibeMensagem("Erro");
        return res.status(500).json(Resposta);
    };
};

const atualizaUsuario = async (req, res) => {
    try {
        const { nomeUsuario, emailUsuario, dataNascimento } = req.body;
        const { ID } = req.params;

        if (!ID) {
            const Resposta = new RespostaHTTP(false, "ID de usuário não fornecido ou invalido");
            Resposta.ExibeMensagem("Erro");
            return res.status(400).json(Resposta);
        };

        const UsuarioID = await Usuario.findByPk(ID);
        if (!UsuarioID) {
            const Resposta = new RespostaHTTP(false, "Não há cadastrado usuário relacionado ao ID ou usuário não encontrado");
            Resposta.ExibeMensagem("Erro");
            return res.status(404).json(Resposta);
        };

        let dadosNovos = {};
        if (nomeUsuario && nomeUsuario != UsuarioID.dataValues.nomeUsuario) dadosNovos.nomeUsuario = nomeUsuario;
        if (emailUsuario && emailUsuario != UsuarioID.dataValues.emailUsuario) dadosNovos.emailUsuario = emailUsuario;
        if (dataNascimento && dataNascimento != UsuarioID.dataValues.dataNascimento) dadosNovos.dataNascimento = dataNascimento;

        await UsuarioID.update(dadosNovos);

        const Resposta = new RespostaHTTP(true, "Dados de usuário atualizados com sucesso", null);
        Resposta.ExibeMensagem();
        return res.status(200).json(Resposta);

    } catch (error) {
        const Resposta = new RespostaHTTP(false, "Erro na atualização de dados de usuário", error.message || error);
        Resposta.ExibeMensagem("Erro");
        return res.status(500).json(Resposta);
    };
};

const deletaUsuario = async (req, res) => {
    try {
        const { ID } = req.params;

        if (!ID) {
            const Resposta = new RespostaHTTP(false, "ID de usuário não fornecido ou invalido");
            Resposta.ExibeMensagem("Erro");
            return res.status(400).json(Resposta);
        };

        const UsuarioID = await Usuario.findByPk(ID);
        if (!UsuarioID) {
            const Resposta = new RespostaHTTP(false, "Não há cadastrado usuário relacionado ao ID ou usuário não encontrado");
            Resposta.ExibeMensagem("Erro");
            return res.status(404).json(Resposta);
        };

        await UsuarioID.destroy();

        const Resposta = new RespostaHTTP(true, "Usuário excluido do sistema com sucesso", null);
        Resposta.ExibeMensagem();
        return res.status(200).json(Resposta);

    } catch (error) {
        const Resposta = new RespostaHTTP(false, "Erro na exclusão de usuário do sistema", error.message || error);
        Resposta.ExibeMensagem("Erro");
        return res.status(500).json(Resposta);
    };
};

// Função de listagem de usuários e ingresos
const listaUsuarios_ingressos = async (req, res) => {
    try {
        // ...
        
    } catch (error) {
        const Resposta = new RespostaHTTP(false, "Erro na listagem de ingressos e usuários", error.message || error);
        Resposta.ExibeMensagem("Erro");
        return res.status(500).json(Resposta);
    };
};

// Função de listagem de ingressos de usuário
const listaUsuario_ingressos = async (req, res) => {
    try {
        // ...
        
    } catch (error) {
        const Resposta = new RespostaHTTP(false, "Erro na listagem de ingressos de usuário", error.message || error);
        Resposta.ExibeMensagem("Erro");
        return res.status(500).json(Resposta);
    };
};

export { listaUsuarios, listaUsuarioID, cadastraUsuario, atualizaUsuario, deletaUsuario };