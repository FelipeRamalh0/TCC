import { db } from "../dbConfig/dbConfig.js";
import { atualizarVerificacaoProfissional } from "../model/profissionalModel.js";

// Listar profissionais pendentes de aprovação
export async function listarProfissionaisPendentes(req, res) {
    try {
        const [rows] = await db.query(`
            SELECT 
                Profissionais.id_profissional,
                Profissionais.id_usuario,
                Usuarios.nome,
                Usuarios.email,
                Profissionais.empresa,
                Profissionais.cargo,
                Profissionais.anos_experiencia,
                Profissionais.bio_profissional,
                Profissionais.status_verificacao,
                Profissionais.revisado_em
            FROM Profissionais
            JOIN Usuarios ON Profissionais.id_usuario = Usuarios.id_usuario
            WHERE Profissionais.status_verificacao = 'pendente'
            ORDER BY Profissionais.id_profissional ASC
        `);

        return res.json({
            quantidade: rows.length,
            profissionais: rows
        });

    } catch (erro) {
        console.error(erro);
        return res.status(500).json({ 
            erro: "Erro ao listar profissionais pendentes" 
        });
    }
}

// Aprovar profissional
export async function aprovarProfissional(req, res) {
    try {
        const { id_profissional } = req.params;
        const id_admin = req.usuario.id_usuario;

        const alterou = await atualizarVerificacaoProfissional(
            id_profissional, 
            'aprovado', 
            id_admin
        );

        if (alterou === 0) {
            return res.status(404).json({ erro: "Profissional não encontrado" });
        }

        return res.json({
            mensagem: "Profissional aprovado com sucesso!"
        });

    } catch (erro) {
        console.error(erro);
        return res.status(500).json({ 
            erro: "Erro ao aprovar profissional" 
        });
    }
}

// Rejeitar profissional
export async function rejeitarProfissional(req, res) {
    try {
        const { id_profissional } = req.params;
        const { motivo } = req.body;
        const id_admin = req.usuario.id_usuario;

        const alterou = await atualizarVerificacaoProfissional(
            id_profissional, 
            'rejeitado', 
            id_admin
        );

        if (alterou === 0) {
            return res.status(404).json({ erro: "Profissional não encontrado" });
        }

        return res.json({
            mensagem: "Profissional rejeitado com sucesso.",
            motivo: motivo || null
        });

    } catch (erro) {
        console.error(erro);
        return res.status(500).json({ 
            erro: "Erro ao rejeitar profissional" 
        });
    }
}

// Buscar detalhes de um profissional para análise
export async function buscarProfissionalParaAnalise(req, res) {
    try {
        const { id_profissional } = req.params;

        const [rows] = await db.query(`
            SELECT 
                Profissionais.*,
                Usuarios.nome,
                Usuarios.email,
                Usuarios.bio as bio_geral
            FROM Profissionais
            JOIN Usuarios ON Profissionais.id_usuario = Usuarios.id_usuario
            WHERE Profissionais.id_profissional = ?
        `, [id_profissional]);

        if (rows.length === 0) {
            return res.status(404).json({ erro: "Profissional não encontrado" });
        }

        return res.json(rows[0]);

    } catch (erro) {
        console.error(erro);
        return res.status(500).json({ 
            erro: "Erro ao buscar profissional" 
        });
    }
}