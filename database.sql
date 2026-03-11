CREATE DATABASE FirstStepDev;

#####TABELA USUARIOS#####

CREATE TABLE Usuarios(
id_usuario INT AUTO_INCREMENT PRIMARY KEY,
nome VARCHAR(30),
senha_hash VARCHAR(30),
tipo_usuario enum('Iniciante','Intermediário', 'Profissional')
);

#####TABELA INICIANTES#####

CREATE TABLE Iniciantes (
id_iniciantes INT AUTO_INCREMENT PRIMARY KEY,
nivel_experiencia varchar(2),
pontuacao int,
bio text,
FOREIGN KEY (id_usuario) REFERENCES Usuarios(id_usuario) ON DELETE CASCADE
);

#####TABELA PROFISSIONAIS#####

CREATE TABLE Profissionais(
id_profissional INT AUTO_INCREMENT PRIMARY KEY,
empresa VARCHAR(30),
cargo VARCHAR(45),
bio TEXT,
FOREIGN KEY (id_usuario) REFERENCES Usuarios(id_usuario) ON DELETE CASCADE
);
