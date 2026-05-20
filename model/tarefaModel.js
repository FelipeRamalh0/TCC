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

export async function listarTarefas() {
    const [rows]= await db.query(
        `SELECT * FROM Tarefas`
    );
    return rows
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
         status = 'em_andamento' WHERE id_tarefa = ?`,
         [id_aprendiz, id_tarefa]
    );
    return result.affectedRows;
    
}

export async function atualizarTarefa(id_tarefa, status) {
    const [result]= await db.query(`
        UPDATE Tarefas SET status = ? WHERE id_tarefa = ?`,
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