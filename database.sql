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
    categoria VARCHAR(50),
    data_criacao DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    data_limite DATETIME,
    nivel_dificuldade ENUM('facil', 'medio', 'dificil') NOT NULL,
    status_tarefa ENUM('aberta', 'em_andamento', 'em_revisao', 'concluida', 'cancelada') NOT NULL DEFAULT 'aberta',

    id_aprendiz_responsavel INT NULL,

    FOREIGN KEY (id_profissional) REFERENCES Profissionais(id_profissional) ON DELETE CASCADE,
    FOREIGN KEY (id_aprendiz_responsavel) REFERENCES Aprendizes(id_aprendizes)
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
    FOREIGN KEY (id_aprendiz) REFERENCES Aprendizes(id_aprendizes) ON DELETE CASCADE
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
    FOREIGN KEY (id_aprendiz) REFERENCES Aprendizes(id_aprendizes) ON DELETE CASCADE
);

##### INSERT USUARIOS #####

INSERT INTO Usuarios (nome, email, senha_hash, tipo_usuario ) VALUES
('Felipe', 'felipao@email.com', 'hash1', 'Aprendiz' ),
('Bispo', 'bispox@email.com', 'hash2', 'Aprendiz' ),
('Carlos', 'carlos@email.com', 'hash3', 'Aprendiz' ),
('Henrique', 'henrique@email.com', 'hash4', 'Profissional'),
('Ramalho', 'ramalho@email.com', 'hash5', 'Profissional' );

##### INSERT APRENDIZES #####

INSERT INTO Aprendizes (id_usuario, nivel_experiencia, pontuacao, bio) VALUES
(1, 'Iniciante', 15, 'Programador backend, que busca mais experiências de mercado.'),
(2, 'Basico', 50, 'Ceo de empresa de tecnologia, que busca contatos profissionais.'),
(3, 'Intermediario', 30, 'Freelancer, que busca novas práticas profissionais.');

UPDATE Aprendizes
SET pontuacao = pontuacao + 5
WHERE id_aprendizes = 1;

##### INSERT PROFISSIONAIS #####

INSERT INTO Profissionais (id_usuario, empresa, cargo, bio) VALUES
(4, 'Programer', 'Desenvolvedor Sênior', 'Especialista em Backend.'),
(5, 'Programing', 'Tech Lead', 'Analista de sistemas');

##### INSERT TAREFAS #####

INSERT INTO Tarefas (id_profissional, titulo, descricao, categoria, data_limite, nivel_dificuldade) VALUES
(1, 'Criar tela de login', 'Desenvolver uma tela inicial', 'Full Stack', '2026-12-01 23:59:59', 'medio'),
(2, 'Analise de dados', 'Analisar erros no sistema', 'Backend', '2026-05-02 23:59:59', 'dificil');

INSERT INTO Tarefas (id_profissional, titulo, descricao, categoria, nivel_dificuldade, id_aprendiz_responsavel, status_tarefa) VALUES
(2, 'Refatorar Classe Login', 'Melhorar a legibilidade do código.', 'Backend', 'medio', 1, 'em_andamento');

UPDATE Tarefas
SET status_tarefa = "em_andamento"
WHERE id_tarefa = 1;

UPDATE Tarefas 
SET status_tarefa = "em_revisao"
WHERE id_tarefa = 1;

##### INSERT ENTREGAS #####

INSERT INTO Entregas (id_tarefa, id_aprendiz, arquivo_url, link_repositorio, status_entrega) VALUES
(1, 1, 'http://storage.com', 'http://github.com', 'Enviado');

UPDATE Entregas
SET status_entrega = "Em avaliacao"
WHERE id_entrega = 1;

UPDATE Entregas 
SET status_entrega = 'Aprovado'
WHERE id_entrega = 1;

##### INSERT HISTÓRICO #####

INSERT INTO Historico_Aprendizes (id_aprendiz, id_tarefa, pontuacao_ganha, status_final_tarefa) VALUES 
(1, 2, 5, 'B'),
(2, 1, 2, 'A'),
(3, 1, 1, 'C');

##### SELECTS #####


SELECT id_tarefa, data_criacao
FROM Tarefas
ORDER BY data_criacao DESC;

SELECT T.titulo, U.nome
FROM Tarefas T
INNER JOIN Profissionais P ON T.id_profissional = P.id_profissional
INNER JOIN Usuarios U ON P.id_usuario = U.id_usuario;

SELECT *
FROM Entregas
WHERE status_entrega = 'Aprovado';

SELECT titulo, data_limite
FROM Tarefas
WHERE data_limite < NOW()
AND status_tarefa != 'concluida';

SELECT T.titulo, U.nome
FROM Tarefas T
INNER JOIN Aprendizes A ON T.id_aprendiz_responsavel = A.id_aprendizes
INNER JOIN Usuarios U ON A.id_usuario = U.id_usuario;

SELECT U.nome, A.pontuacao
FROM Aprendizes A
INNER JOIN Usuarios U ON A.id_usuario = U.id_usuario
ORDER BY A.pontuacao DESC;

SELECT U.nome, H.pontuacao_ganha, H.status_final_tarefa
FROM Historico_Aprendizes H
INNER JOIN Aprendizes A ON H.id_aprendiz = A.id_aprendizes
INNER JOIN Usuarios U ON A.id_usuario = U.id_usuario;

SELECT 
T.titulo,
U.nome,
E.status_entrega,
E.data_envio
FROM Entregas E
INNER JOIN Tarefas T ON E.id_tarefa = T.id_tarefa
INNER JOIN Aprendizes A ON E.id_aprendiz = A.id_aprendizes
INNER JOIN Usuarios U ON A.id_usuario = U.id_usuario;
