import { db } from "../dbConfig/dbConfig.js";

export async function salvarToken(dados) {
    
    const {
        id_usuario,
        token,
        expiracao
    } = dados
    const [result]= await db.query(
        `INSERT INTO Recuperacao_Senha(
        id_usuario, token, expiracao) VALUES (?, ?, ?)`,
        [id_usuario, token, expiracao]
    );
    return result.insertId
}

export async function buscarToken(token){
const [rows]= await db.query(
    `SELECT * FROM Recuperacao_Senha
    WHERE token= ? and usado = FALSE
    and expiracao > NOW()`,
    [token]
);
return rows[0]
}
// Marcar token usado
export async function usarToken(token){

    const [result] = await db.query(

        `UPDATE Recuperacao_Senha

         SET usado = TRUE

         WHERE token = ?`,

        [token]
    );

    return result.affectedRows;
}