CREATE DATABASE FirstStepDev;
USE FirstStepDev;

#####   TABELA USUARIOS #####

CREATE TABLE Usuarios(
    id_usuario INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(30) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    senha_hash VARCHAR(255) NOT NULL,
    tipo_usuario ENUM('Aprendiz','Profissional') NOT NULL
);

#####   TABELA Aprendizes   #####

CREATE TABLE Aprendizes (
    id_aprendizes INT AUTO_INCREMENT PRIMARY KEY,
    id_usuario INT UNIQUE NOT NULL,
    nivel_experiencia ENUM('Iniciante','Basico','Intermediario'),
    pontuacao INT NOT NULL DEFAULT 0,
    bio TEXT,

    FOREIGN KEY (id_usuario) REFERENCES Usuarios(id_usuario) ON DELETE CASCADE
);

#####   TABELA PROFISSIONAIS    #####

CREATE TABLE Profissionais(
    id_profissional INT AUTO_INCREMENT PRIMARY KEY,
    id_usuario INT UNIQUE NOT NULL,
    empresa VARCHAR(30),
    cargo VARCHAR(45),
    bio TEXT,

    FOREIGN KEY (id_usuario) REFERENCES Usuarios(id_usuario) ON DELETE CASCADE
);

#####   TABELA TAREFAS  #####

CREATE TABLE Tarefas(
    id_tarefa INT AUTO_INCREMENT PRIMARY KEY,
    id_profissional INT NOT NULL,
    titulo VARCHAR(30) NOT NULL,
    descricao VARCHAR(255),
    categoria ENUM('Frontent','Backend', 'Full Stack'),
    data_criacao DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    data_limite DATETIME,
    nivel_dificuldade ENUM('facil', 'medio', 'dificil') NOT NULL,
    status ENUM('aberta', 'em_andamento', 'em_revisao', 'concluida', 'cancelada') NOT NULL DEFAULT 'aberta',

    id_aprendiz_responsavel INT NULL,
FOREIGN KEY (id_aprendiz_responsavel)
REFERENCES Aprendizes(id_aprendizes)
);

##### ENTREGAS ######

CREATE TABLE Entregas (
    id_entrega INT AUTO_INCREMENT PRIMARY KEY,
    id_tarefa INT NOT NULL,
    id_aprendiz INT NOT NULL,
    data_envio DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    arquivo_url VARCHAR(255),
    link_repositorio VARCHAR(255),
    codigo_texto TEXT,
    status_entrega ENUM('Enviado', 'Em avaliacao', 'Aprovado', 'Rejeitado') NOT NULL DEFAULT 'Enviado',

    FOREIGN KEY (id_tarefa) REFERENCES Tarefas(id_tarefa) ON DELETE CASCADE,
    FOREIGN KEY (id_aprendiz) REFERENCES aprendizes(id_aprendizes) ON DELETE CASCADE
);

##### HISTÓRICO INICIANTE #####

CREATE TABLE Historico_Aprendizes(
    id_historico INT AUTO_INCREMENT PRIMARY KEY,
    id_aprendiz INT NOT NULL,
    id_tarefa INT NOT NULL,
    pontuacao_ganha INT NOT NULL,
    status_final_tarefa ENUM('D', 'C', 'B', 'A') NOT NULL,
    data_registro DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY (id_tarefa) REFERENCES Tarefas(id_tarefa) ON DELETE CASCADE,
    FOREIGN KEY (id_aprendiz) REFERENCES aprendizes(id_aprendizes) ON DELETE CASCADE
);
