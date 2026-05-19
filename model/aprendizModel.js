import { db } from "../dbConfig/dbConfig.js";

export async function criarAprendiz(dados) {
    const { id_usuario, nivel_experiencia, bio } = dados;
    const [result] = await db.query(
        `INSERT INTO Aprendizes (id_usuario, nivel_experiencia, bio) 
         VALUES (?, ?, ?)`,
        [id_usuario, nivel_experiencia, bio || null]
    );
    return result.insertId;
}

// Buscar por id aprendiz (corrigido nome da coluna)
export async function buscarAprendizId(id) {
    const [rows] = await db.query(
        `SELECT * FROM Aprendizes WHERE id_aprendiz = ?`,
        [id]
    );
    return rows[0];
}

// Buscar aprendiz por id_usuario
export async function buscarAprendizIdUsuario(id_usuario) {
    const [rows] = await db.query(
        `SELECT * FROM Aprendizes WHERE id_usuario = ?`, 
        [id_usuario]
    );
    return rows[0];
}

// Atualizar Aprendiz (corrigidos nomes das colunas)
export async function atualizarAprendiz(dados, id) {
    const { nivel_experiencia, bio } = dados;

    const [result] = await db.query(
        `UPDATE Aprendizes 
         SET nivel_experiencia = ?, bio = ? 
         WHERE id_aprendiz = ?`,
        [nivel_experiencia, bio || null, id]
    );
    return result.affectedRows;
}

export async function atualizarPontuacao(id, pontos) {
    const [result] = await db.query(
        `UPDATE Aprendizes
         SET pontuacao = pontuacao + ?
         WHERE id_aprendiz = ?`,
        [pontos, id]
    );

    return result.affectedRows;
}