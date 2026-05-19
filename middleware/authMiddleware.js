import jwt from "jsonwebtoken";
import { isProfissionalVerificado } from "../model/profissionalModel.js";

const SECRET = process.env.SECRET;

export function verificarToken(req, res, next) {

    try {

        const authHeader = req.headers.authorization;

        if (!authHeader) {
            return res.status(401).json({
                erro: "Token não fornecido"
            });
        }

        const token = authHeader.split(" ")[1];

        const decoded = jwt.verify(token, SECRET);

        req.usuario = decoded;

        next();

    } catch (error) {

        return res.status(401).json({
            erro: "Token inválido"
        });
    }
}

// ====================== NOVO MIDDLEWARE ======================
// Verifica se o usuário é Profissional E está verificado/aprovado
export async function verificarProfissionalVerificado(req, res, next) {

    try {
        const { id_usuario, tipo_usuario } = req.usuario;

        // Se não for profissional, libera (útil para rotas mistas)
        if (tipo_usuario !== "Profissional") {
            return next();
        }

        const estaVerificado = await isProfissionalVerificado(id_usuario);

        if (!estaVerificado) {
            return res.status(403).json({
                erro: "Seu perfil profissional ainda está pendente de aprovação. Aguarde a análise."
            });
        }

        next();

    } catch (error) {
        console.error(error);
        return res.status(500).json({
            erro: "Erro ao verificar status do profissional"
        });
    }
}