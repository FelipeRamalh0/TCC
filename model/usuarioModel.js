import { db } from "../dbConfig/dbConfig.js";

export async function criarUsuario(dados) {
    const {nome, email, senha_hash, tipo_usuario, bio} = dados;   // bio já existia na tabela
    
    const [result] = await db.query(
         `INSERT INTO Usuarios (nome, email, senha_hash, tipo_usuario, bio)
          VALUES (?, ?, ?, ?, ?)`,
         [nome, email, senha_hash, tipo_usuario, bio || null]
    );
    return result.insertId;
}

export async function listarUsuarios(){
    const [rows]= await db.query(
        `SELECT nome, email, tipo_usuario FROM Usuarios`
    );
    return rows;
}

//Buscar por Id Usuario
export async function buscarId(id){
    const [rows]= await db.query(
        `SELECT id_usuario, nome, email, tipo_usuario, bio FROM Usuarios
        WHERE id_usuario= ?`, [id]
    );
    return rows[0];
}

export async function buscarEmail(email) {
    const [rows]= await db.query(
        `SELECT * FROM Usuarios WHERE email= ?`, [email]
    );
    return rows[0];
}

export async function atualizarUsuario(id, dados){
    const {nome, email, bio} = dados;   // adicionei bio

    const [result]= await db.query(
        `UPDATE Usuarios set nome = ?, email = ?, bio = ? 
         WHERE id_usuario= ? `,
        [nome, email, bio || null, id]
    )
    return result.affectedRows
}

export async function deletarUsuario(id){
    const [result]= await db.query(
        `DELETE FROM Usuarios WHERE id_usuario = ?`,
        [id]
    )
    return result.affectedRows;
}