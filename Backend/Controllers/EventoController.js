import Evento from "../Models/Evento.js";
import RespostaHTTP from "../Config/RespostaHTTP.js";

const listaEventos = async (req, res) => {
    try {
        const { filtro, tipoFiltro = "" } = req.query; // Filtros de listagem

        let lista_eventos = await Evento.findAll({ order: [["dataInicio", "DESC"], ["horaInicio", "ASC"]] });

        if (filtro) {
            switch (tipoFiltro) {
                case "nomeEvento":
                    lista_eventos = lista_eventos.filter(a => a.dataValues.nomeEvento.startsWith(filtro));
                    break;
                case "localEvento":
                    lista_eventos = lista_eventos.filter(a => a.dataValues.localEvento.startsWith(filtro) || a.dataValues.localEvento.includes(filtro));
            };
        };

        if (lista_eventos.length > 0) {
            const Resposta = new RespostaHTTP(true, "Eventos listados com sucesso", null, lista_eventos);
            Resposta.ExibeMensagem();
            return res.status(200).json(Resposta);

        } else {
            const Resposta = new RespostaHTTP(false, "Não há eventos cadastrados ou eventos não encontrados");
            Resposta.ExibeMensagem("Erro");
            return res.status(404).json(Resposta);
        };

    } catch (error) {
        const Resposta = new RespostaHTTP(false, "Erro na listagem de eventos", error.message || error);
        Resposta.ExibeMensagem("Erro");
        return res.status(500).json(Resposta);
    };
};

const listaEventoID = async (req, res) => {
    try {
        const { ID } = req.params;

        if (!ID) {
            const Resposta = new RespostaHTTP(false, "ID de evento não fornecido ou invalido");
            Resposta.ExibeMensagem("Erro");
            return res.status(400).json(Resposta);
        };

        const EventoID = await Evento.findByPk(ID);
        if (EventoID) {
            const Resposta = new RespostaHTTP(true, "Evento listado por ID com sucesso", null, EventoID);
            Resposta.ExibeMensagem();
            return res.status(200).json(Resposta);

        } else {
            const Resposta = new RespostaHTTP(false, "Não há cadastrado evento relacionado ao ID ou evento não encontrado");
            Resposta.ExibeMensagem("Erro");
            return res.status(404).json(Resposta);
        };

    } catch (error) {
        const Resposta = new RespostaHTTP(false, "Erro na listagem de evento por ID", error.message || error);
        Resposta.ExibeMensagem("Erro");
        return res.status(500).json(Resposta);
    };
};

const cadastraEvento = async (req, res) => {
    try {
        const { nomeEvento, localEvento, dataInicio, dataFim, horaInicio, horaFim, limiteIngressos, ingressos_pessoas } = req.body;

        if (!nomeEvento) {
            const Resposta = new RespostaHTTP(false, "Nome de evento não fornecido ou invalido");
            Resposta.ExibeMensagem("Erro");
            return res.status(400).json(Resposta);
        };

        if (!localEvento) {
            const Resposta = new RespostaHTTP(false, "Local de evento não fornecido ou invalido");
            Resposta.ExibeMensagem("Erro");
            return res.status(400).json(Resposta);
        };

        if (!dataInicio) {
            const Resposta = new RespostaHTTP(false, "Data de inicio de evento não fornecida ou invalida");
            Resposta.ExibeMensagem("Erro");
            return res.status(400).json(Resposta);
        };

        if (!dataFim) {
            const Resposta = new RespostaHTTP(false, "Data de fim de evento não fornecida ou invalida");
            Resposta.ExibeMensagem("Erro");
            return res.status(400).json(Resposta);
        };

        if (!horaInicio) {
            const Resposta = new RespostaHTTP(false, "Hora de inicio de evento não fornecida ou invalida");
            Resposta.ExibeMensagem("Erro");
            return res.status(400).json(Resposta);
        };

        if (!horaFim) {
            const Resposta = new RespostaHTTP(false, "Nome de evento não fornecida ou invalida");
            Resposta.ExibeMensagem("Erro");
            return res.status(400).json(Resposta);
        };

        if (!limiteIngressos) {
            const Resposta = new RespostaHTTP(false, "Limite de ingressos de evento não fornecido ou invalido");
            Resposta.ExibeMensagem("Erro");
            return res.status(400).json(Resposta);
        };

        if (!ingressos_pessoas) {
            const Resposta = new RespostaHTTP(false, "Número limite de ingressos por pessoa de evento não fornecido ou invalido");
            Resposta.ExibeMensagem("Erro");
            return res.status(400).json(Resposta);
        };

        const dadosEvento = {
            nomeEvento: nomeEvento,
            localEvento: localEvento,
            dataInicio: dataInicio,
            dataFim: dataFim,
            horaInicio: horaInicio,
            horaFim: horaFim,
            limiteIngressos: limiteIngressos,
            ingressos_pessoas: ingressos_pessoas
        };

        const EventoCadastrado = await Evento.create(dadosEvento);
        if (EventoCadastrado) {
            const Resposta = new RespostaHTTP(true, "Novo evento cadastrado com sucesso", null, EventoCadastrado);
            Resposta.ExibeMensagem();
            return res.status(201).json(Resposta);
        };

    } catch (error) {
        const Resposta = new RespostaHTTP(false, "Erro no cadastro de novo evento", error.message || error);
        Resposta.ExibeMensagem("Erro");
        return res.status(500).json(Resposta);
    };
};

const atualizaEvento = async (req, res) => {
    try {
        const { ID } = req.params;
        const { nomeEvento, localEvento, dataInicio, dataFim, horaInicio, horaFim, limiteIngressos, ingressos_pessoas } = req.body;

        if (!ID) {
            const Resposta = new RespostaHTTP(false, "ID de evento não fornecido ou invalido");
            Resposta.ExibeMensagem("Erro");
            return res.status(400).json(Resposta);
        };

        const EventoID = await Evento.findByPk(ID);
        if (!EventoID) {
            const Resposta = new RespostaHTTP(false, "Não há cadastrado evento relacionado ao ID ou evento não encontrado");
            Resposta.ExibeMensagem("Erro");
            return res.status(404).json(Resposta);
        }

        let dadosNovos = {};
        if (nomeEvento && nomeEvento != EventoID.dataValues.nomeEvento) dadosNovos.nomeEvento = nomeEvento;
        if (localEvento && localEvento != EventoID.dataValues.localEvento) dadosNovos.localEvento = localEvento;
        if (dataInicio && dataInicio != EventoID.dataValues.dataInicio) dadosNovos.dataInicio = dataInicio;
        if (dataFim && dataFim != EventoID.dataValues.dataFim) dadosNovos.dataFim = dataFim;
        if (horaInicio && horaInicio != EventoID.dataValues.horaInicio) dadosNovos.horaInicio = horaInicio;
        if (horaFim && horaFim != EventoID.dataValues.horaFim) dadosNovos.horaFim = horaFim;
        if (limiteIngressos && limiteIngressos != EventoID.dataValues.limiteIngressos) dadosNovos.limiteIngressos = limiteIngressos;
        if (ingressos_pessoas && ingressos_pessoas != EventoID.dataValues.ingressos_pessoas) dadosNovos.ingressos_pessoas = ingressos_pessoas;

        await EventoID.update(dadosNovos);

        const Resposta = new RespostaHTTP(true, "Dados de evento atualizados com sucesso", null);
        Resposta.ExibeMensagem();
        return res.status(200).json(Resposta);


    } catch (error) {
        const Resposta = new RespostaHTTP(false, "Erro na atualização de dados de evento", error.message || error);
        Resposta.ExibeMensagem("Erro");
        return res.status(500).json(Resposta);
    };
};

const deletaEvento = async (req, res) => {
    try {
        const { ID } = req.params;

        if (!ID) {
            const Resposta = new RespostaHTTP(false, "ID de evento não fornecido ou invalido");
            Resposta.ExibeMensagem("Erro");
            return res.status(400).json(Resposta);
        };

        const EventoID = await Evento.findByPk(ID);
        if (!EventoID) {
            const Resposta = new RespostaHTTP(false, "Não há cadastrado evento relacionado ao ID ou evento não encontrado");
            Resposta.ExibeMensagem("Erro");
            return res.status(404).json(Resposta);
        }

        await EventoID.destroy();

        const Resposta = new RespostaHTTP(true, "Evento excluido do sistema com sucesso", null);
        Resposta.ExibeMensagem();
        return res.status(200).json(Resposta);

    } catch (error) {
        const Resposta = new RespostaHTTP(false, "Erro no exclusão de evento do sistema", error.message || error);
        Resposta.ExibeMensagem("Erro");
        return res.status(500).json(Resposta);
    };
};

export { listaEventos, listaEventoID, cadastraEvento, atualizaEvento, deletaEvento };

