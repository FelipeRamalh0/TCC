import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import { criarUsuario, buscarEmail } from "../model/usuarioModel.js";
import { criarAprendiz } from "../model/aprendizModel.js";
import { criarProfissional } from "../model/profissionalModel.js";

const SECRET = process.env.SECRET;

// Cadastro
export async function cadastrar(req, res) {

    try {

        const {
            nome,
            email,
            senha,
            tipo_usuario,
            nivel_experiencia,
            empresa,
            cargo,
            bio,
            // Campos novos para Profissionais
            anos_experiencia,
            bio_profissional
        } = req.body;

        // Validar campos
        if (!nome || !email || !senha || !tipo_usuario) {
            return res.status(400).json({
                erro: "Preencha todos os campos obrigatórios"
            });
        }

        // Verificar email
        const usuarioExistente = await buscarEmail(email);

        if (usuarioExistente) {
            return res.status(400).json({
                erro: "Email já cadastrado"
            });
        }

        // Criptografar senha
        const senha_hash = await bcrypt.hash(senha, 10);

        // Criar usuário
        const id_usuario = await criarUsuario({
            nome,
            email,
            senha_hash,
            tipo_usuario,
            bio
        });

        // Criar perfil específico
        if (tipo_usuario === "Aprendiz") {

            await criarAprendiz({
                id_usuario,
                nivel_experiencia,
                bio
            });

        } else if (tipo_usuario === "Profissional") {

            await criarProfissional({
                id_usuario,
                empresa,
                cargo,
                bio,
                anos_experiencia,
                bio_profissional
            });
        }

        return res.status(201).json({
            mensagem: "Usuário criado com sucesso",
            id_usuario
        });

    } catch (erro) {

        console.log("ERRO COMPLETO:");
        console.log(erro);

        return res.status(500).json({
            message: erro.message,
            code: erro.code,
            sqlMessage: erro.sqlMessage,
            stack: erro.stack
        });
    }
}

// Login (mantido igual)
export async function login(req, res) {

    try {

        const { email, senha } = req.body;

        // Buscar usuário
        const usuario = await buscarEmail(email);

        if (!usuario) {
            return res.status(404).json({
                erro: "Usuário não encontrado"
            });
        }

        // Comparar senha
        const senhaValida = await bcrypt.compare(
            senha,
            usuario.senha_hash
        );

        if (!senhaValida) {
            return res.status(401).json({
                erro: "Senha inválida"
            });
        }

        // Gerar token
        const token = jwt.sign(
            {
                id_usuario: usuario.id_usuario,
                tipo_usuario: usuario.tipo_usuario
            },
            SECRET,
            { expiresIn: "1d" }
        );

        return res.json({
            mensagem: "Login realizado com sucesso",
            token,
            usuario: {
                id_usuario: usuario.id_usuario,
                nome: usuario.nome,
                tipo_usuario: usuario.tipo_usuario
            }
        });

    } catch (erro) {

        console.error(erro);

        return res.status(500).json({
            message: erro.message,
            code: erro.code,
            sqlMessage: erro.sqlMessage,
            stack: erro.stack
        });
    }
}