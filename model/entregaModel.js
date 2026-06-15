import { db } from "../dbConfig/dbConfig.js";


// Criar entrega
export async function criarEntrega(dados){

    const {
        id_tarefa,
        id_aprendiz,
        arquivo_url,
        link_repositorio,
        codigo_texto
    } = dados;

    const [result] = await db.query(

        `INSERT INTO Entregas (

            id_tarefa,
            id_aprendiz,
            arquivo_url,
            link_repositorio,
            codigo_texto

        )

        VALUES (?, ?, ?, ?, ?)`,

        [
            id_tarefa,
            id_aprendiz,
            arquivo_url,
            link_repositorio,
            codigo_texto
        ]
    );

    return result.insertId;
}

export async function buscarEntregaPorTarefaEAprendiz(
    id_tarefa,
    id_aprendiz
) {
    const [rows] = await db.query(
        `
        SELECT *
        FROM Entregas
        WHERE id_tarefa = ?
        AND id_aprendiz = ?
        `,
        [id_tarefa, id_aprendiz]
    );

    return rows[0];
}

export async function atualizarEntregaReprovada(
    id_entrega,
    arquivo_url,
    link_repositorio,
    codigo_texto
) {

    const [result] = await db.query(
        `
        UPDATE Entregas
        SET
            arquivo_url = ?,
            link_repositorio = ?,
            codigo_texto = ?,
            status_entrega = 'Em avaliacao',
            feedback = NULL
        WHERE id_entrega = ?
        `,
        [
            arquivo_url,
            link_repositorio,
            codigo_texto,
            id_entrega
        ]
    );

    return result.affectedRows;
}

// Listar entregas
export async function listarEntregas(){

    const [rows] = await db.query(
        ` SELECT
            E.*,
            T.titulo,
            U.nome AS aprendiz_nome
        FROM Entregas E
        INNER JOIN Tarefas T
            ON E.id_tarefa = T.id_tarefa
        INNER JOIN Aprendizes A
            ON E.id_aprendiz = A.id_aprendiz
        INNER JOIN Usuarios U
            ON A.id_usuario = U.id_usuario`
    );

    return rows;
}


// Buscar entrega por ID
export async function buscarEntregaPorId(id){

    const [rows] = await db.query(

        `   SELECT * FROM Entregas WHERE id_entrega= ?`,

        [id]
    );

    return rows[0];
}


// Listar entregas por tarefa
export async function listarEntregasPorTarefa(
    id_tarefa
){

    const [rows] = await db.query(

        `SELECT * FROM Entregas
         WHERE id_tarefa = ?`,

        [id_tarefa]
    );

    return rows;
}

export async function listarEntregasPorProfissional(
    id_profissional
){

    const [rows] = await db.query(

        `SELECT
    E.*,
    T.titulo,
    U.nome AS aprendiz_nome
FROM Entregas E
INNER JOIN Tarefas T
    ON E.id_tarefa = T.id_tarefa
INNER JOIN Aprendizes A
    ON E.id_aprendiz = A.id_aprendiz
INNER JOIN Usuarios U
    ON A.id_usuario = U.id_usuario
WHERE T.id_profissional = ?;`,

        [id_profissional]
    );

    return rows;
}


// Atualizar status
export async function atualizarStatusEntrega(
    id_entrega,
    status,
    feedback
){

    const [result] = await db.query(

        `UPDATE Entregas

         SET status_entrega = ?,
        feedback = ?
         WHERE id_entrega = ?`,

        [status, feedback, id_entrega]
    );

    return result.affectedRows;
}


// Deletar entrega
export async function deletarEntrega(id){

    const [result] = await db.query(

        `DELETE FROM Entregas
         WHERE id_entrega = ?`,

        [id]
    );

    return result.affectedRows;
}