-- Criação do banco de dados
CREATE DATABASE IF NOT EXISTS escola_vinicius;

-- Seleção do banco de dados
USE escola_vinicius;

-- Criação da tabela de usuários
CREATE TABLE IF NOT EXISTS usuarios_vinicius (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(255) NOT NULL,
    senha VARCHAR(255) NOT NULL,
    tipo ENUM('operador', 'cliente') NOT NULL
);

-- Criação da tabela de requisições
CREATE TABLE IF NOT EXISTS requisicoes_vinicius (
    id INT AUTO_INCREMENT PRIMARY KEY,
    solicitante VARCHAR(255) NOT NULL,
    destino VARCHAR(255) NOT NULL,
    material VARCHAR(255) NOT NULL,
    quantidade INT NOT NULL,
    prioridade BOOLEAN NOT NULL,
    usuario_id INT,
    FOREIGN KEY (usuario_id) REFERENCES usuarios_vinicius(id)
);
