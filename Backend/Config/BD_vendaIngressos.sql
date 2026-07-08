-- Arquivo com o script de criação de banco de dados do sistema

-- Banco de dados
CREATE DATABASE BD_vendaIngressos;

USE BD_vendaIngressos;

-- Criação de tabelas do banco
CREATE TABLE Evento(
    ID_evento INT PRIMARY KEY AUTO_INCREMENT,  
    nomeEvento VARCHAR(120) NOT NULL UNIQUE,  
    dataInicio DATE NOT NULL,  
    dataFim DATE NOT NULL,  
    horaInicio TIME NOT NULL,  
    horaFim TIME NOT NULL,  
    limiteIngressos INT,  
    localEvento VARCHAR(120) NOT NULL,  
    ingresso_pessoa INT NOT NULL DEFAULT 1
);

CREATE TABLE Ingresso(
    ID_ingresso INT PRIMARY KEY AUTO_INCREMENT,  
    ID_evento INT NOT NULL,
    FOREIGN KEY(ID_evento) REFERENCES Evento (ID_evento),
    precoIngresso DECIMAL(10,2) NOT NULL DEFAULT 0
);

CREATE TABLE Usuario(
    CPF VARCHAR(14) PRIMARY KEY,  
    nomeUsuario VARCHAR(100) NOT NULL,  
    dataNascimento DATE NOT NULL,  
    emailUsuario VARCHAR(100) NOT NULL
);

CREATE TABLE Ingresso_usuario(
    ID_relacionamento INT PRIMARY KEY AUTO_INCREMENT,  
    ID_ingresso INT NOT NULL,
    FOREIGN KEY(ID_ingresso) REFERENCES Ingresso (ID_ingresso),
    CPF VARCHAR(14) NOT NULL,
    FOREIGN KEY(CPF) REFERENCES Usuario (CPF),
    quantidadeIngresso INT NOT NULL DEFAULT 1,  
    valorPago DECIMAL(12,2) NOT NULL,  
    formaPagamento ENUM("Dinheiro em espécie", "Cartão de Crédito", "Cartão de Debito", "Pix") NOT NULL,  
    dataCompra DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);