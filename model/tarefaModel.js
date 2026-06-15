import { db } from "../dbConfig/dbConfig.js";

export async function criarTarefa(dados) {
    const { id_profissional,
            titulo,
            descricao,
            categoria,
            data_limite,
            nivel_dificuldade,
             }= dados;
        const [result]= await db.query(
            `INSERT INTO Tarefas (
            id_profissional,
            titulo,
            descricao,
            categoria,
            data_limite,
            nivel_dificuldade
            )
            VALUES (?, ?, ?, ?, ?, ?)`,
            [id_profissional, titulo, descricao, categoria, data_limite, nivel_dificuldade]
        );
        return result.insertId
}

export async function listarTarefas(){

   const [result] = await db.query(`
   
      SELECT

         t.*,

         u.nome AS profissional_nome

      FROM tarefas t

      JOIN profissionais p
      ON t.id_profissional = p.id_profissional

      JOIN usuarios u
      ON p.id_usuario = u.id_usuario

      WHERE t.status_tarefa = 'aberta'

   `);

   return result;

}
export async function buscarTarefasPorProfissional(
   id_profissional
){

   const [resultado] = await db.query(`
   
      SELECT *
      FROM Tarefas
      WHERE id_profissional = ?

   `, [id_profissional]);

   return resultado;

}

export async function buscarTarefasAprendiz(
   id_aprendiz
){

   const [result] = await db.query(`

      SELECT *
      FROM tarefas
      WHERE id_aprendiz_responsavel = ?
      AND status_tarefa = 'em_andamento'

   `,[id_aprendiz]);

   return result;

}

export async function atualizarStatusTarefa(
    id_tarefa,
    status
){

    const [result] = await db.query(
        `
        UPDATE Tarefas
        SET status_tarefa = ?
        WHERE id_tarefa = ?
        `,
        [status, id_tarefa]
    );

    return result.affectedRows;
}
//Buscar Tarefa por Id tarefa
export async function buscarTarefaId(id) {
const [rows]= await db.query(
    `SELECT * FROM Tarefas WHERE id_tarefa = ?`,
    [id]
)
 return rows[0];
}
// Aprendiz pegar a tarefa
export async function assumirTarefa(id_tarefa, id_aprendiz) {
    const [result]= await db.query(
        `UPDATE Tarefas SET id_aprendiz_responsavel = ?,
         status_tarefa = 'em_andamento' WHERE id_tarefa = ?`,
         [id_aprendiz, id_tarefa]
    );
    return result.affectedRows;
    
}

export async function atualizarTarefa(id_tarefa, status) {
    const [result]= await db.query(`
        UPDATE Tarefas SET status_tarefa = ? WHERE id_tarefa = ?`,
         [status, id_tarefa]
    )
       return result.affectedRows;
}
//Deletar por id
export async function deletarTarefa(id) {
    const [result]= await db.query(
        `DELETE FROM Tarefas WHERE id_tarefa = ?`,
        [id]
    );
    return result.affectedRows
    
}
