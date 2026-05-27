import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { connection } from "../database/connection.js";

export const usuariosRoutes = express.Router();


/* =========================
   LOGIN
========================= */

usuariosRoutes.post("/login", (req, res) => {

    const { email, senha } = req.body;

    const sql = `

        SELECT *
        FROM Usuarios
        WHERE email = ?

    `;

    connection.query(

        sql,

        [email],

        async (err, result) => {

            if (err) {

                return res.status(500).json({
                    erro: "Erro no servidor"
                });

            }

            if (result.length === 0) {

                return res.status(404).json({
                    erro: "Usuário não encontrado"
                });

            }

            const usuario = result[0];


            /* VERIFICA SENHA */

            const senhaCorreta =
                await bcrypt.compare(
                    senha,
                    usuario.senha_hash
                );


            if (!senhaCorreta) {

                return res.status(401).json({
                    erro: "Senha incorreta"
                });

            }


            /* TOKEN */

            const token = jwt.sign(

                {
                    id: usuario.id_usuario
                },

                "segredo"

            );


            /* RETORNO */

            res.json({

                token,

                usuario: {

                    id: usuario.id_usuario,
                    nome: usuario.nome,
                    email: usuario.email,
                    tipo_usuario:
                        usuario.tipo_usuario

                }

            });

        }

    );

});