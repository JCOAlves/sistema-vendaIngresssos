import Ingresso from "../Models/Ingresso.js";
import Evento from "../Models/Evento.js";
import RespostaHTTP from "../Config/RespostaHTTP.js";

const listaIngressos = async (req, res) => {
    try {
        const { filtro, tipoFiltro = "" } = req.query; // Filtros de listagem

        let lista_ingressos = await Ingresso.findAll({ include: Evento });

        if (filtro) {
            switch (tipoFiltro) {
                case "nomeEvento":
                    lista_ingressos = lista_ingressos.filter(a => a.dataValues.ID_evento.nomeEvento.startsWith(filtro))
                    break;

                case "ID_evento":
                    if (Number(filtro) != NaN) lista_ingressos = await Ingresso.findAll({ where: { ID_evento: filtro }, include: Evento });
                    break;
            };
        };

        if (lista_ingressos.length > 0) {
            const Resposta = new RespostaHTTP(true, "Ingressos listados com sucesso", null, lista_ingressos);
            Resposta.ExibeMensagem();
            return res.status(200).json(Resposta);

        } else {
            const Resposta = new RespostaHTTP(false, "Não há ingressos cadastrados ou ingressos não encontrados");
            Resposta.ExibeMensagem("Erro");
            return res.status(404).json(Resposta);
        }

    } catch (error) {
        const Resposta = new RespostaHTTP(false, "Erro na listagem de ingressos", error.message || error);
        Resposta.ExibeMensagem("Erro");
        return res.status(500).json(Resposta);
    };
};

const listaIngressoID = async (req, res) => {
    try {
        const { ID } = req.params;

        if (!ID) {
            const Resposta = new RespostaHTTP(false, "ID de ingresso não fornecido ou invalido");
            Resposta.ExibeMensagem("Erro");
            return res.status(400).json(Resposta);
        };

        const IngressoID = await Ingresso.findByPk(ID, { include: Evento });
        if (IngressoID) {
            const Resposta = new RespostaHTTP(true, "Ingresso listado por ID com sucesso", null, IngressoID);
            Resposta.ExibeMensagem();
            return res.status(200).json(Resposta);

        } else {
            const Resposta = new RespostaHTTP(false, "Não há cadastrado ingresso relacionado ao ID ou ingresso não encontrado");
            Resposta.ExibeMensagem("Erro");
            return res.status(404).json(Resposta);
        };

    } catch (error) {
        const Resposta = new RespostaHTTP(false, "Erro na listagem de ingresso por ID", error.message || error);
        Resposta.ExibeMensagem("Erro");
        return res.status(500).json(Resposta);
    };
};

// Adicionar limite de ingressos a ser vendido
const cadastraIngresso = async (req, res) => {
    try {
        const { ID_evento, precoIngresso } = req.body;

        if (!ID_evento) {
            const Resposta = new RespostaHTTP(false, "Nome de evento não fornecido ou invalido");
            Resposta.ExibeMensagem("Erro");
            return res.status(400).json(Resposta);
        };

        const EventoID = await Evento.findByPk(ID_evento);
        if (EventoID) {
            const Resposta = new RespostaHTTP(false, "Não há cadastrado evento relacionado ao ID ou evento não encontrado");
            Resposta.ExibeMensagem("Erro");
            return res.status(404).json(Resposta);
        };

        if (!precoIngresso) {
            const Resposta = new RespostaHTTP(false, "Local de evento não fornecido ou invalido");
            Resposta.ExibeMensagem("Erro");
            return res.status(400).json(Resposta);
        };

        const dadosIngresso = {
            ID_evento: ID_evento,
            precoIngresso: precoIngresso
        };

        const lista_ingressos = await Ingresso.findAll();
        if (EventoID.dataValues.limiteIngressos != lista_ingressos.length) {
            const Resposta = new RespostaHTTP(false, "Número limite de criação de ingressos já ultrapassado");
            Resposta.ExibeMensagem("Erro");
            return res.status(401).json(Resposta);
        };

        const IngressoCadastrado = await Ingresso.create(dadosIngresso);
        if (IngressoCadastrado) {
            const Resposta = new RespostaHTTP(true, "Novo ingresso cadastrado com sucesso", null, IngressoCadastrado);
            Resposta.ExibeMensagem();
            return res.status(201).json(Resposta);
        };

    } catch (error) {
        const Resposta = new RespostaHTTP(false, "Erro no cadastro de novo ingresso", error.message || error);
        Resposta.ExibeMensagem("Erro");
        return res.status(500).json(Resposta);
    };
};

const atualizaIngresso = async (req, res) => {
    try {
        const { ID_evento, precoIngresso } = req.body;
        const { ID } = req.params;

        if (!ID) {
            const Resposta = new RespostaHTTP(false, "ID de ingresso não fornecido ou invalido");
            Resposta.ExibeMensagem("Erro");
            return res.status(400).json(Resposta);
        };

        const IngressoID = await Ingresso.findByPk(ID);
        if (!IngressoID) {
            const Resposta = new RespostaHTTP(false, "Não há cadastrado ingresso relacionado ao ID ou ingresso não encontrado");
            Resposta.ExibeMensagem("Erro");
            return res.status(404).json(Resposta);
        };

        let dadosNovos = {};
        if (precoIngresso && precoIngresso != IngressoID.dataValues.precoIngresso) dadosNovos.precoIngresso = precoIngresso;

        const EventoID = await Evento.findByPk(ID_evento);
        if (ID_evento && EventoID && ID_evento != IngressoID.dataValues.ID_evento) dadosNovos.ID_evento = ID_evento;

        await IngressoID.update(dadosNovos);

        const Resposta = new RespostaHTTP(true, "Dados de ingresso atualizados com sucesso", null);
        Resposta.ExibeMensagem();
        return res.status(200).json(Resposta);


    } catch (error) {
        const Resposta = new RespostaHTTP(false, "Erro na atualização de dados de ingresso", error.message || error);
        Resposta.ExibeMensagem("Erro");
        return res.status(500).json(Resposta);
    };
};

const deletaIngresso = async (req, res) => {
    try {
        const { ID } = req.params;

        if (!ID) {
            const Resposta = new RespostaHTTP(false, "ID de ingresso não fornecido ou invalido");
            Resposta.ExibeMensagem("Erro");
            return res.status(400).json(Resposta);
        };

        const IngressoID = await Ingresso.findByPk(ID);
        if (!IngressoID) {
            const Resposta = new RespostaHTTP(false, "Não há cadastrado ingresso relacionado ao ID ou ingresso não encontrado");
            Resposta.ExibeMensagem("Erro");
            return res.status(404).json(Resposta);
        };

        await IngressoID.destroy();

        const Resposta = new RespostaHTTP(true, "Ingresso excluido do sistema com sucesso", null);
        Resposta.ExibeMensagem();
        return res.status(200).json(Resposta);


    } catch (error) {
        const Resposta = new RespostaHTTP(false, "Erro no exclusão de ingresso do sistema", error.message || error);
        Resposta.ExibeMensagem("Erro");
        return res.status(500).json(Resposta);
    };
};

export { listaIngressos, listaIngressoID, cadastraIngresso, atualizaIngresso, deletaIngresso };