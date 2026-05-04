import { db } from "../dbConfig/dbConfig";

export async function criarUsuario(dados) {
    const {nome, email, senha_hash, tipo_usuario} = dados;
    const [result]= await db.query(
         `INSERT INTO Usuarios (nome, email, senha_hash, tipo_usuario)
     VALUES (?, ?, ?, ?)`,
     [nome, email, senha_hash, tipo_usuario]
    );
    return result.insertId;
}

