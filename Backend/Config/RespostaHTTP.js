class RespostaHTTP {
    constructor(sucesso, mensagem, erro=mensagem, dados=null){
        this.sucesso = sucesso;
        this.mensagem = mensagem;
        this.erro = erro;
        this.dados = dados;
    };

    ExibeMensagem(tipoMensagem=""){
        switch (tipoMensagem) {
            case "Erro":
                console.error(this.mensagem);
                break;
        
            default:
                console.log(this.mensagem);
                break;
        };
    };
};

export default RespostaHTTP;