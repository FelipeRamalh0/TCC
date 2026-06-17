import { db } from "../dbConfig/dbConfig.js";


// Listar histórico completo
export async function listarHistorico() {

    const [rows] = await db.query(

        `  SELECT
            H.*,
            T.titulo,
            U.nome AS aprendiz_nome,
            E.feedback
        FROM Historico_Aprendizes H
        INNER JOIN Tarefas T
            ON H.id_tarefa = T.id_tarefa
        INNER JOIN Aprendizes A
            ON H.id_aprendiz = A.id_aprendiz
        INNER JOIN Usuarios U
            ON A.id_usuario = U.id_usuario
        LEFT JOIN Entregas E
            ON E.id_tarefa = H.id_tarefa
           AND E.id_aprendiz = H.id_aprendiz`
    );

    return rows;
}

export async function listarHistoricoAprendiz(
    id_aprendiz
) {

    const [rows] = await db.query(

        `SELECT
            H.*,
            T.titulo,
            U.nome AS aprendiz_nome,
            E.feedback
        FROM Historico_Aprendizes H
        INNER JOIN Tarefas T
            ON H.id_tarefa = T.id_tarefa
        INNER JOIN Aprendizes A
            ON H.id_aprendiz = A.id_aprendiz
        INNER JOIN Usuarios U
            ON A.id_usuario = U.id_usuario
        LEFT JOIN Entregas E
            ON E.id_tarefa = H.id_tarefa
           AND E.id_aprendiz = H.id_aprendiz
        WHERE H.id_aprendiz = ?`,

        [id_aprendiz]
    );

    return rows;
}
// Buscar histórico por ID
export async function buscarHistoricoPorId(id) {

    const [rows] = await db.query(

        `SELECT *

         FROM Historico_Aprendizes

         WHERE id_historico = ?`,

        [id]
    );

    return rows[0];
}


// Buscar histórico do aprendiz
export async function buscarHistoricoAprendiz(
    id_aprendiz
) {

    const [rows] = await db.query(

        `SELECT *

         FROM Historico_Aprendizes

         WHERE id_aprendiz = ?`,

        [id_aprendiz]
    );

    return rows;
}
//buscar a pontuação do aprendiz
export async function buscarPontuacao(id_aprendiz){

    const [rows] = await db.query(

        `SELECT
            pontuacao,
            nivel_experiencia
         FROM Aprendizes
         WHERE id_aprendiz = ?`,

        [id_aprendiz]
    );

    return rows[0];
}

// Ranking
export async function rankingAprendizes() {

    const [rows] = await db.query(

        `SELECT

            U.nome,
            A.pontuacao,
            A.nivel_experiencia

         FROM Aprendizes A

         INNER JOIN Usuarios U
         ON A.id_usuario = U.id_usuario

         ORDER BY A.pontuacao DESC`
    );

    return rows;
}