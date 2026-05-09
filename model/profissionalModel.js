import { db } from "../dbConfig/dbConfig.js";
//Criar Profissional
export async function criarProfissional(dados) {
    const {id_usuario, empresa, cargo, bio}= dados;
    const [result]= await db.query(
        `INSERT id_usuario, empresa, cargo, bio VALUES(?, ?, ?, ?)`,
        [id_usuario, empresa, cargo, bio]
    );
    return result.insertId
}
//Buscar por Id profissional
export async function buscarProfissionalId(id) {
    const [rows]= await db.query(
        `SELECT * FROM Profissionais WHERE id_profissional = ?`,
        [id]
    )
    return rows[0]
}
//Buscar por Id usuario
export async function buscarProfissionalPorUsuario(id_usuario) {
    const [rows]= await db.query(
        `SELECT * FROM Profissionais WHERE id_usuario = ?`,
        [id_usuario]
    )
    return rows[0];
}
//Atualizar profissional
export async function atualizarProfissional(dados, id) {
    const {empresa, cargo, bio}= dados;
    const [result]= await db.query(
        `UPDATE Profissionais SET empresa = ?, carga = ?, bio = ? WHERE id_profissional = id`,
        [empresa, cargo, bio]
    );
    return result.affectedRows
}