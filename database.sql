DROP DATABASE IF EXISTS FirstStepDev;
CREATE DATABASE FirstStepDev;
USE FirstStepDev;

#####   TABELA USUARIOS #####

CREATE TABLE Usuarios(
    id_usuario INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(150) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,        -- ← Corrigido para 255
    bio TEXT,
    senha_hash VARCHAR(255) NOT NULL,
    tipo_usuario ENUM('Aprendiz','Profissional') NOT NULL,
    criado_em DATETIME DEFAULT CURRENT_TIMESTAMP,
    atualizado_em DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

#####   TABELA APRENDIZES   #####

CREATE TABLE Aprendizes (
    id_aprendiz INT AUTO_INCREMENT PRIMARY KEY,
    id_usuario INT UNIQUE NOT NULL,
    foto_perfil VARCHAR(255),
    nivel_experiencia ENUM('Iniciante','Basico','Intermediario', 'Avançado'),
    pontuacao INT NOT NULL DEFAULT 0,
    github VARCHAR(255),
    linkedin VARCHAR(255),

    FOREIGN KEY (id_usuario)
        REFERENCES Usuarios(id_usuario)
        ON DELETE CASCADE
);

#####   TABELA PROFISSIONAIS    #####


    CREATE TABLE Profissionais(
    id_profissional INT AUTO_INCREMENT PRIMARY KEY,
    id_usuario INT UNIQUE NOT NULL,
    empresa VARCHAR(30),
    cargo VARCHAR(45),
    github VARCHAR(255),
    linkedin VARCHAR(255),
    
    -- ✅ Campos novos adicionados:
    verificado TINYINT(1) NOT NULL DEFAULT 0,
    status_verificacao ENUM('pendente', 'aprovado', 'rejeitado') NOT NULL DEFAULT 'pendente',
    anos_experiencia INT NULL,
    bio_profissional TEXT NULL,
    revisado_por INT NULL,
    revisado_em DATETIME NULL,
    
    FOREIGN KEY (id_usuario) REFERENCES Usuarios(id_usuario) ON DELETE CASCADE,
    FOREIGN KEY (revisado_por) REFERENCES Usuarios(id_usuario) ON DELETE SET NULL
);


#####   TABELA TAREFAS  #####

CREATE TABLE Tarefas(
    id_tarefa INT AUTO_INCREMENT PRIMARY KEY,
    id_profissional INT NOT NULL,
    titulo VARCHAR(150) NOT NULL,
    descricao TEXT,
    categoria VARCHAR(50),
    data_criacao DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    data_limite DATETIME,
    nivel_dificuldade ENUM('facil','medio','dificil') NOT NULL,
    status_tarefa ENUM('aberta','em_andamento','em_revisao','concluida','cancelada') NOT NULL DEFAULT 'aberta',
    
    id_aprendiz_responsavel INT NULL,
    id_entrega_atual INT NULL,                    -- ← Novo campo adicionado
    
    FOREIGN KEY (id_profissional) REFERENCES Profissionais(id_profissional) ON DELETE CASCADE,
    FOREIGN KEY (id_aprendiz_responsavel) REFERENCES Aprendizes(id_aprendiz) ON DELETE SET NULL
);

##### TABELA ENTREGAS ######

CREATE TABLE Entregas (
    id_entrega INT AUTO_INCREMENT PRIMARY KEY,
    id_tarefa INT NOT NULL,
    id_aprendiz INT NOT NULL,
    data_envio DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    arquivo_url VARCHAR(255),
    link_repositorio VARCHAR(255),
    codigo_texto TEXT,
    status_entrega ENUM('enviado','em_avaliacao','aprovado','rejeitado') 
        NOT NULL DEFAULT 'enviado',                    -- ← Sem acentuação e em minúsculo

    FOREIGN KEY (id_tarefa) REFERENCES Tarefas(id_tarefa) ON DELETE CASCADE,
    FOREIGN KEY (id_aprendiz) REFERENCES Aprendizes(id_aprendiz) ON DELETE CASCADE
);

##### TABELA HISTÓRICO #####

CREATE TABLE Historico_Aprendizes(
    id_historico INT AUTO_INCREMENT PRIMARY KEY,
    
    id_aprendiz INT NOT NULL,
    id_tarefa INT NOT NULL,
    id_entrega INT NULL,
    id_profissional INT NULL,
    
    pontuacao_ganha INT NOT NULL DEFAULT 0,
    
    -- ✅ MELHORIA NO STATUS_FINAL
    status_final ENUM('excelente', 'bom', 'regular', 'insuficiente') 
        NOT NULL DEFAULT 'bom',
    
    nota_final INT NULL CHECK (nota_final BETWEEN 0 AND 10),
    comentario_feedback TEXT NULL,
    
    data_registro DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY (id_aprendiz) REFERENCES Aprendizes(id_aprendiz) ON DELETE CASCADE,
    FOREIGN KEY (id_tarefa) REFERENCES Tarefas(id_tarefa) ON DELETE RESTRICT,
    FOREIGN KEY (id_entrega) REFERENCES Entregas(id_entrega) ON DELETE SET NULL,
    FOREIGN KEY (id_profissional) REFERENCES Profissionais(id_profissional) ON DELETE SET NULL
);

CREATE TABLE Feedbacks (
    id_feedback INT AUTO_INCREMENT PRIMARY KEY,
    id_entrega INT NOT NULL,
    id_profissional INT NOT NULL,
    comentario TEXT NOT NULL,
    nota INT CHECK (nota BETWEEN 0 AND 10),
    data_feedback DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    
    FOREIGN KEY (id_entrega) REFERENCES Entregas(id_entrega) ON DELETE CASCADE,
    FOREIGN KEY (id_profissional) REFERENCES Profissionais(id_profissional)
);

##### TABELA RECUPERAÇÃO DE SENHA #####

CREATE TABLE Recuperacao_Senha(
    id_recuperacao INT AUTO_INCREMENT PRIMARY KEY,
    id_usuario INT NOT NULL,
    token VARCHAR(255) UNIQUE NOT NULL,
    expiracao DATETIME NOT NULL,
    usado BOOLEAN NOT NULL DEFAULT FALSE,
    data_solicitacao DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY (id_usuario)
        REFERENCES Usuarios(id_usuario)
        ON DELETE CASCADE
);

##### INDEX #####

CREATE INDEX idx_usuario_nome ON Usuarios(nome);
CREATE INDEX idx_usuario_email ON Usuarios(email);
CREATE INDEX idx_usuario_tipo_usuario ON Usuarios(tipo_usuario);

CREATE INDEX idx_aprendiz_usuario ON Aprendizes(id_usuario);
CREATE INDEX idx_profissional_usuario ON Profissionais(id_usuario);

CREATE INDEX idx_tarefa_profissional ON Tarefas(id_profissional);
CREATE INDEX idx_tarefa_categoria ON Tarefas(categoria);
CREATE INDEX idx_tarefa_status ON Tarefas(status_tarefa);
CREATE INDEX idx_tarefa_data_limite ON Tarefas(data_limite);

CREATE INDEX idx_entrega_tarefa ON Entregas(id_tarefa);
CREATE INDEX idx_entrega_aprendiz ON Entregas(id_aprendiz);
CREATE INDEX idx_entrega_status ON Entregas(status_entrega);

CREATE INDEX idx_historico_aprendiz ON Historico_Aprendizes(id_aprendiz);
CREATE INDEX idx_historico_tarefa ON Historico_Aprendizes(id_tarefa);

CREATE INDEX idx_recuperacao_usuario ON Recuperacao_Senha(id_usuario);
CREATE INDEX idx_recuperacao_token ON Recuperacao_Senha(token);

##### TRIGGERS #####

### REMOVE DATA LIMITE QUANDO TAREFA FOR CONCLUÍDA ###

DELIMITER $$

CREATE TRIGGER trg_update_tarefa_status
BEFORE UPDATE ON Tarefas
FOR EACH ROW
BEGIN
    IF NEW.status_tarefa = 'concluida'
       AND OLD.status_tarefa <> 'concluida' THEN
        SET NEW.data_limite = NULL;
    END IF;
END$$

DELIMITER ;

---

### GARANTE QUE SO PODE ATRIBUIR TAREFAS EM ANDAMENTO ###

DELIMITER $$

CREATE TRIGGER trg_validar_aprendiz_responsavel
BEFORE UPDATE ON Tarefas
FOR EACH ROW
BEGIN
    IF NEW.id_aprendiz_responsavel IS NOT NULL
       AND NEW.status_tarefa <> 'em_andamento' THEN
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'Aprendiz responsável só pode ser atribuído a tarefas em andamento.';
    END IF;
END$$

DELIMITER ;

---

### CRIA HISTÓRICO + PONTUAÇÃO QUANDO TAREFA CONCLUÍDA ###

DELIMITER $$

CREATE TRIGGER trg_criar_historico
AFTER UPDATE ON Tarefas
FOR EACH ROW
BEGIN
    IF NEW.status_tarefa = 'concluida'
       AND OLD.status_tarefa <> 'concluida' THEN

        INSERT INTO Historico_Aprendizes
        (id_aprendiz, id_tarefa, pontuacao_ganha, status_final_tarefa)
        VALUES
        (
            NEW.id_aprendiz_responsavel,
            NEW.id_tarefa,
            10,
            'A'
        );

        UPDATE Aprendizes
        SET pontuacao = pontuacao + 10
        WHERE id_aprendiz = NEW.id_aprendiz_responsavel;

    END IF;
END$$

DELIMITER ;

---

### ATUALIZA NÍVEL DE EXPERIÊNCIA AUTOMATICAMENTE ###

DELIMITER $$

CREATE TRIGGER trg_aumentar_nivel
BEFORE UPDATE ON Aprendizes
FOR EACH ROW
BEGIN

    IF NEW.pontuacao BETWEEN 0 AND 20 THEN
        SET NEW.nivel_experiencia = 'Iniciante';

    ELSEIF NEW.pontuacao BETWEEN 21 AND 50 THEN
        SET NEW.nivel_experiencia = 'Basico';

    ELSE
        SET NEW.nivel_experiencia = 'Intermediario';

    END IF;

END$$

DELIMITER ;

---

##### INSERT USUARIOS #####

INSERT INTO Usuarios (nome, email, senha_hash, tipo_usuario ) VALUES
('Felipe', 'felipao@email.com', '$2y$10$hashbcrypt1', 'Aprendiz'),
('Bispo', 'bispox@email.com', '$2y$10$hashbcrypt2', 'Aprendiz'),
('Carlos', 'carlos@email.com', '$2y$10$hashbcrypt3', 'Aprendiz'),
('Henrique', 'henrique@email.com', '$2y$10$hashbcrypt4', 'Profissional'),
('Ramalho', 'ramalho@email.com', '$2y$10$hashbcrypt5', 'Profissional');

---

##### INSERT APRENDIZES #####

INSERT INTO Aprendizes (id_usuario, nivel_experiencia, pontuacao, bio) VALUES
(1, 'Iniciante', 15, 'Programador backend que busca mais experiências de mercado.'),
(2, 'Basico', 50, 'CEO de empresa de tecnologia.'),
(3, 'Intermediario', 30, 'Freelancer em busca de novas práticas.');

---

##### INSERT PROFISSIONAIS #####

INSERT INTO Profissionais (id_usuario, empresa, cargo, bio) VALUES
(4, 'Programer', 'Desenvolvedor Sênior', 'Especialista em Backend.'),
(5, 'Programing', 'Tech Lead', 'Analista de sistemas.');

---

##### INSERT TAREFAS #####

INSERT INTO Tarefas (id_profissional, titulo, descricao, categoria, data_limite, nivel_dificuldade) VALUES
(1, 'Criar tela de login', 'Desenvolver uma tela inicial', 'Full Stack', '2026-12-01 23:59:59', 'medio'),
(2, 'Analise de dados', 'Analisar erros no sistema', 'Backend', '2026-05-02 23:59:59', 'dificil');

INSERT INTO Tarefas (id_profissional, titulo, descricao, categoria, nivel_dificuldade, id_aprendiz_responsavel, status_tarefa) VALUES
(2, 'Refatorar Classe Login', 'Melhorar o código.', 'Backend', 'medio', 1, 'em_andamento');

---

##### INSERT ENTREGAS #####

INSERT INTO Entregas (id_tarefa, id_aprendiz, arquivo_url, link_repositorio, status_entrega) VALUES
(1, 1, 'http://storage.com', 'http://github.com', 'Enviado');

UPDATE Entregas
SET status_entrega = 'Em avaliacao'
WHERE id_entrega = 1;

UPDATE Entregas
SET status_entrega = 'Aprovado'
WHERE id_entrega = 1;

---

##### INSERT HISTÓRICO #####

INSERT INTO Historico_Aprendizes (id_aprendiz, id_tarefa, pontuacao_ganha, status_final_tarefa) VALUES 
(1, 2, 5, 'B'),
(2, 1, 2, 'A'),
(3, 1, 1, 'C');

---

##### EXEMPLO RECUPERAÇÃO DE SENHA #####

INSERT INTO Recuperacao_Senha
(id_usuario, token, expiracao)
VALUES
(
    1,
    'token_abc_123',
    DATE_ADD(NOW(), INTERVAL 1 HOUR)
);

---

##### EXEMPLO REDEFINIR SENHA #####

UPDATE Usuarios
SET senha_hash = '$2y$10$NOVOHASHCRIPTOGRAFADO'
WHERE id_usuario = 1;

UPDATE Recuperacao_Senha
SET usado = TRUE
WHERE token = 'token_abc_123';

---

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
INNER JOIN Aprendizes A ON T.id_aprendiz_responsavel = A.id_aprendiz
INNER JOIN Usuarios U ON A.id_usuario = U.id_usuario;

SELECT U.nome, A.pontuacao
FROM Aprendizes A
INNER JOIN Usuarios U ON A.id_usuario = U.id_usuario
ORDER BY A.pontuacao DESC;

SELECT U.nome, H.pontuacao_ganha, H.status_final_tarefa
FROM Historico_Aprendizes H
INNER JOIN Aprendizes A ON H.id_aprendiz = A.id_aprendiz
INNER JOIN Usuarios U ON A.id_usuario = U.id_usuario;

SELECT 
T.titulo,
U.nome,
E.status_entrega,
E.data_envio
FROM Entregas E
INNER JOIN Tarefas T ON E.id_tarefa = T.id_tarefa
INNER JOIN Aprendizes A ON E.id_aprendiz = A.id_aprendiz
INNER JOIN Usuarios U ON A.id_usuario = U.id_usuario;

---

##### CONSULTA TOKENS VÁLIDOS #####

SELECT *
FROM Recuperacao_Senha
WHERE usado = FALSE
AND expiracao > NOW();

---

##### CONSULTA RECUPERAÇÃO POR USUÁRIO #####

SELECT
U.nome,
U.email,
R.token,
R.expiracao,
R.usado
FROM Recuperacao_Senha R
INNER JOIN Usuarios U
ON R.id_usuario = U.id_usuario;
