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

export async function listarUsuarios(){
    const [rows]= await db.query(
        `SELECT nome, email, tipo_usuario FROM Usuarios`
    );
    return rows;
}
//Buscar por Id Usuario
export async function buscarId(id){
    const [rows]= await db.query(
        `SELECT id_usuario, nome, email, tipo_usuario FROM Usuarios
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
    const {nome, email}= dados;

    const [result]= await db.query(
        `UPDATE Usuarios set nome = ?, email = ? WHERE id_usuario= ? `,
        [nome, email, id]
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


