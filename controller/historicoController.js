import {

    listarHistorico,
    listarHistoricoAprendiz,
    buscarHistoricoPorId,
    buscarHistoricoAprendiz,
    buscarPontuacao,
    rankingAprendizes

} from "../model/historicoModel.js";

import { buscarAprendizIdUsuario } from "../model/aprendizModel.js";

export async function listar(req, res) {

    try {

        const aprendiz =
            await buscarAprendizIdUsuario(
                req.usuario.id_usuario
            );

        const historico =
            await listarHistoricoAprendiz(
                aprendiz.id_aprendiz
            );

        return res.json(historico);

    } catch (erro) {
        console.log(erro)
        return res.status(500).json({
            erro: erro.message
        });
    }
}

export async function buscarPorId(req, res) {

    try {

        const { id } = req.params;

        const historico =
            await buscarHistoricoPorId(id);

        if (!historico) {

            return res.status(404).json({
                erro: "Histórico não encontrado"
            });
        }

        return res.json(historico);

    } catch (erro) {

        console.log(erro);

        return res.status(500).json({
            erro: erro.message
        });
    }
}

export async function pontuacao(req, res) {

    try {

        const usuario = req.usuario;

        const aprendiz = await buscarAprendizIdUsuario(
            usuario.id_usuario
        );

        if (!aprendiz) {

            return res.status(404).json({
                erro: "Aprendiz não encontrado"
            });
        }

        const dados = await buscarPontuacao(
            aprendiz.id_aprendiz
        );

        return res.json(dados);

    } catch (erro) {

        console.log(erro);

        return res.status(500).json({
            erro: erro.message
        });
    }
}

export async function meuHistorico(req, res) {

    try {

        const usuario = req.usuario;

        // Buscar aprendiz
        const aprendiz =
            await buscarAprendizIdUsuario(
                usuario.id_usuario
            );

        const historico =
            await buscarHistoricoAprendiz(
                aprendiz.id_aprendiz
            );

        return res.json(historico);

    } catch (erro) {

        console.log(erro);

        return res.status(500).json({
            erro: erro.message
        });
    }
}

export async function ranking(req, res) {

    try {

        const ranking =
            await rankingAprendizes();

        return res.json(ranking);

    } catch (erro) {

        console.log(erro);

        return res.status(500).json({
            erro: erro.message
        });
    }
}
