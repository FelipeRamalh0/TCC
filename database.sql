CREATE DATABASE FirstStepDev;
USE FirstStepDev;

#####   TABELA USUARIOS #####

CREATE TABLE Usuarios(
    id_usuario INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    senha_hash VARCHAR(255) NOT NULL,
    tipo_usuario ENUM('Aprendiz','Profissional') NOT NULL
);

#####   TABELA APRENDIZES   #####

CREATE TABLE Aprendizes (
    id_aprendizes INT AUTO_INCREMENT PRIMARY KEY,
    id_usuario INT UNIQUE NOT NULL,
    nivel_experiencia ENUM('Iniciante','Basico','Intermediario'),
    pontuacao INT NOT NULL DEFAULT 0,
    bio TEXT,

    FOREIGN KEY (id_usuario) 
    REFERENCES Usuarios(id_usuario) 
    ON DELETE CASCADE
);

#####   TABELA PROFISSIONAIS    #####

CREATE TABLE Profissionais(
    id_profissional INT AUTO_INCREMENT PRIMARY KEY,
    id_usuario INT UNIQUE NOT NULL,
    empresa VARCHAR(50),
    cargo VARCHAR(50),
    bio TEXT,

    FOREIGN KEY (id_usuario) 
    REFERENCES Usuarios(id_usuario) 
    ON DELETE CASCADE
);

#####   TABELA TAREFAS  #####

CREATE TABLE Tarefas(
    id_tarefa INT AUTO_INCREMENT PRIMARY KEY,
    id_profissional INT NOT NULL,
    id_aprendiz_responsavel INT NULL,

    titulo VARCHAR(100) NOT NULL,
    descricao TEXT,
    categoria VARCHAR(50),

    data_criacao DATETIME DEFAULT CURRENT_TIMESTAMP,
    data_limite DATETIME,

    nivel_dificuldade ENUM('facil', 'medio', 'dificil') NOT NULL,

    status ENUM(
        'aberta',
        'em_andamento',
        'em_revisao',
        'concluida',
        'cancelada'
    ) DEFAULT 'aberta',

    FOREIGN KEY (id_profissional)
    REFERENCES Profissionais(id_profissional),

    FOREIGN KEY (id_aprendiz_responsavel)
    REFERENCES Aprendizes(id_aprendizes)
);

#####   TABELA ENTREGAS #####

CREATE TABLE Entregas (
    id_entrega INT AUTO_INCREMENT PRIMARY KEY,
    id_tarefa INT NOT NULL,
    id_aprendiz INT NOT NULL,

    data_envio DATETIME DEFAULT CURRENT_TIMESTAMP,

    arquivo_url VARCHAR(255),
    link_repositorio VARCHAR(255),
    codigo_texto TEXT,

    status_entrega ENUM(
        'Enviado',
        'Em avaliacao',
        'Aprovado',
        'Rejeitado'
    ) DEFAULT 'Enviado',

    feedback TEXT,
    data_avaliacao DATETIME,

    FOREIGN KEY (id_tarefa) 
    REFERENCES Tarefas(id_tarefa) 
    ON DELETE CASCADE,

    FOREIGN KEY (id_aprendiz) 
    REFERENCES Aprendizes(id_aprendizes) 
    ON DELETE CASCADE
);

#####   TABELA HISTORICO APRENDIZES #####

CREATE TABLE Historico_Aprendizes(
    id_historico INT AUTO_INCREMENT PRIMARY KEY,
    id_aprendiz INT NOT NULL,
    id_tarefa INT NOT NULL,

    pontuacao_ganha INT NOT NULL,

    status_final_tarefa ENUM(
        'Reprovada',
        'Corrigida',
        'Aprovada'
    ) NOT NULL,

    data_registro DATETIME DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY (id_tarefa) 
    REFERENCES Tarefas(id_tarefa) 
    ON DELETE CASCADE,

    FOREIGN KEY (id_aprendiz) 
    REFERENCES Aprendizes(id_aprendizes) 
    ON DELETE CASCADE
);

#####   TABELA FEEDBACKS #####

CREATE TABLE Feedbacks(
    id_feedback INT AUTO_INCREMENT PRIMARY KEY,
    id_entrega INT NOT NULL,
    comentario TEXT,
    nota INT,

    status ENUM('Corrigir','Aprovado'),

    data_feedback DATETIME DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY(id_entrega)
    REFERENCES Entregas(id_entrega)
);

#####   TABELA MENSAGENS (CHAT) #####

CREATE TABLE Mensagens(
    id_mensagem INT AUTO_INCREMENT PRIMARY KEY,
    id_tarefa INT NOT NULL,
    id_usuario INT NOT NULL,

    mensagem TEXT NOT NULL,
    data_envio DATETIME DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY (id_tarefa)
    REFERENCES Tarefas(id_tarefa),

    FOREIGN KEY (id_usuario)
    REFERENCES Usuarios(id_usuario)
);

INSERT INTO Usuarios (nome, email, senha_hash, tipo_usuario) VALUES
('João', 'joao@email.com', 'hash1', 'Aprendiz'),
('Maria', 'maria@email.com', 'hash2', 'Aprendiz'),
('Carlos', 'carlos@email.com', 'hash3', 'Profissional'),
('Ana', 'ana@email.com', 'hash4', 'Profissional');

INSERT INTO Aprendizes (id_usuario, nivel_experiencia, pontuacao, bio) VALUES
(1, 'Iniciante', 15, 'Buscando experiência prática'),
(2, 'Intermediario', 30, 'Freelancer em evolução');

INSERT INTO Profissionais (id_usuario, empresa, cargo, bio) VALUES
(3, 'Programer', 'Dev Sênior', 'Especialista em backend'),
(4, 'TechCorp', 'Tech Lead', 'Analista de sistemas');

INSERT INTO Tarefas 
(id_profissional, titulo, descricao, categoria, nivel_dificuldade, id_aprendiz_responsavel, status)
VALUES
(1, 'Refatorar login', 'Melhorar código', 'Backend', 'medio', 1, 'em_andamento');

INSERT INTO Entregas 
(id_tarefa, id_aprendiz, arquivo_url, link_repositorio)
VALUES
(3, 1, 'http://storage.com', 'http://github.com');

INSERT INTO Historico_Aprendizes 
(id_aprendiz, id_tarefa, pontuacao_ganha, status_final_tarefa)
VALUES 
(1, 1, 10, 'Aprovada'),
(2, 2, 5, 'Corrigida');