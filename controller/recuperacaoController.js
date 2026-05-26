import crypto from "crypto";
import bcrypt from "bcrypt";

import { transporter } from "../utils/email.js";

import {
    salvarToken,
    buscarToken,
    usarToken
}
from "../model/recuperacaoModel.js";

import {
    buscarEmail,
    atualizarSenha
}
from "../model/usuarioModel.js";

export async function esqueciSenha(req, res){

    try {

        const { email } = req.body;

        const usuario = await buscarEmail(email);

        if(!usuario){

            return res.status(404).json({
                erro: "Usuário não encontrado"
            });
        }

        // Gerar token
        const token = crypto.randomBytes(32)
        .toString("hex");

        // Expiração 1 hora
        const expiracao = new Date(
            Date.now() + 3600000
        );

        // Salvar no banco
        await salvarToken({

            id_usuario: usuario.id_usuario,
            token,
            expiracao
        });
        console.log(token)

        // Link
        const link = `http://localhost:3000/redefinir-senha/${token}`;

        // Enviar email
        await transporter.sendMail({

            from: process.env.EMAIL_USER,

            to: email,

            subject: "Recuperação de senha",

            html: `
                <h1>Recuperação de senha</h1>

                <p>Clique no link abaixo:</p>

                <a href="${link}">
                    Redefinir senha
                </a>
            `
        });

        return res.json({
            mensagem: "Email enviado"
        });

    } catch (erro){

        console.log(erro);

        return res.status(500).json({
            erro: erro.message
        });
    }
}

export async function redefinirSenha(req, res){

    try {

        const { token } = req.params;

        const { novaSenha } = req.body;

        const tokenValido = await buscarToken(token);

        if(!tokenValido){

            return res.status(400).json({
                erro: "Token inválido ou expirado"
            });
        }

        const senha_hash = await bcrypt.hash(
            novaSenha,
            10
        );

        await atualizarSenha(
            tokenValido.id_usuario,
            senha_hash
        );

        await usarToken(token);

        return res.json({
            mensagem: "Senha redefinida"
        });

    } catch (erro){

        console.log(erro);

        return res.status(500).json({
            erro: erro.message
        });
    }
}