import { db } from "../dbConfig/dbConfig.js";

// Criar Profissional
export async function criarProfissional(dados) {

    const {
        id_usuario,
        empresa,
        cargo,
        bio,
        anos_experiencia,
        bio_profissional
    } = dados;

    const [result] = await db.query(
        `
        INSERT INTO Profissionais
        (id_usuario, empresa, cargo, bio, anos_experiencia, bio_profissional,
         verificado, status_verificacao)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)
        `,
        [
            id_usuario, 
            empresa, 
            cargo, 
            bio || null,
            anos_experiencia || null,
            bio_profissional || null,
            0,                    // verificado = false
            'pendente'            // status_verificacao
        ]
    );

    return result.insertId;
}

// Buscar por Id profissional
export async function buscarProfissionalId(id) {

    const [rows] = await db.query(
        `SELECT * FROM Profissionais WHERE id_profissional = ?`,
        [id]
    );

    return rows[0];
}

// Buscar por Id usuario
export async function buscarProfissionalPorUsuario(id_usuario) {

    const [rows] = await db.query(
        `SELECT * FROM Profissionais WHERE id_usuario = ?`,
        [id_usuario]
    );

    return rows[0];
}

// Atualizar profissional
export async function atualizarProfissional(dados, id) {

    const {
        empresa,
        cargo,
        bio,
        anos_experiencia,
        bio_profissional
    } = dados;

    const [result] = await db.query(
        `
        UPDATE Profissionais
        SET empresa = ?, 
            cargo = ?, 
            bio = ?,
            anos_experiencia = ?,
            bio_profissional = ?
        WHERE id_profissional = ?
        `,
        [empresa, cargo, bio || null, anos_experiencia || null, bio_profissional || null, id]
    );

    return result.affectedRows;
}

// ====================== NOVAS FUNÇÕES PARA VERIFICAÇÃO ======================

// Aprovar ou rejeitar profissional
export async function atualizarVerificacaoProfissional(id_profissional, status, revisado_por) {
    const [result] = await db.query(
        `
        UPDATE Profissionais 
        SET verificado = ?,
            status_verificacao = ?,
            revisado_por = ?,
            revisado_em = NOW()
        WHERE id_profissional = ?
        `,
        [status === 'aprovado' ? 1 : 0, status, revisado_por, id_profissional]
    );

    return result.affectedRows;
}

// Verificar se profissional está aprovado
export async function isProfissionalVerificado(id_usuario) {
    const [rows] = await db.query(
        `
        SELECT verificado, status_verificacao 
        FROM Profissionais 
        WHERE id_usuario = ?
        `,
        [id_usuario]
    );

    if (rows.length === 0) return false;
    
    const prof = rows[0];
    return prof.verificado === 1 && prof.status_verificacao === 'aprovado';
}

