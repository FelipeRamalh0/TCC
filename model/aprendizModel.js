import { db } from "../dbConfig/dbConfig";

export async function criarAprendiz(dados) {
    const { id_usuario, nivel_experiencia, bio }= dados;
    const [result]= await db.query(
        `INSERT INTO Aprendizes(id_usuario, nivel_experiencia, bio) VALUES( ?, ?, ?)`,
        [id_usuario, nivel_experiencia, bio]
    );
    return result.insertId;
    
}

export async function buscarAprendizId(id) {
    
    const [rows]= await db.query(
        `SELECT * FROM Aprendizes WHERE id_aprendizes = ?`,
        [id]
    );
    return rows[0]

}
export async function buscarAprendizIdUsuario(id_usuario) {
    const [rows]= await db.query(
        `SELECT * FROM Aprendizes WHERE id_usuario = ?`, [id_usuario]
    );
    return rows[0]
};

export async function atualizarAprenduiz(dados, id) {
    const { nivel_experiencia, bio}= dados;

    const [result]= await db.query(
        `UPDATE Aprendizes set nivel_experiencia = ?, bio = ? WHERE id_apendizes = ?`,
        [nivel_experiencia, bio, id]
    )
    return result.affectedRows;
}

export async function atualizarPontuacao(id, pontos){
  const [result] = await dbConfig.query(
    `UPDATE Aprendizes
     SET pontuacao = pontuacao + ?
     WHERE id_aprendizes = ?`,
    [pontos, id]
  );

  return result.affectedRows;
}