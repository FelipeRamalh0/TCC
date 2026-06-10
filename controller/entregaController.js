import {

    criarEntrega,
    listarEntregas,
    buscarEntregaPorId,
    listarEntregasPorTarefa,
    atualizarStatusEntrega,
    deletarEntrega

} from "../model/entregaModel.js";

import {
    buscarAprendizIdUsuario
} from "../model/aprendizModel.js";

export async function criar(req, res) {

    try {

        const {

            id_tarefa,
            link_repositorio,
            codigo_texto

        } = req.body;
        const arquivo_url = req.file
            ? req.file.filename
            : null;

        const usuario = req.usuario;

        // Apenas aprendiz
        if (usuario.tipo_usuario !== "Aprendiz") {

            return res.status(403).json({
                erro: "Apenas aprendizes podem enviar entregas"
            });
        }

        // Buscar aprendiz
        const aprendiz = await buscarAprendizIdUsuario(
            usuario.id_usuario
        );

        const id_entrega = await criarEntrega({

            id_tarefa,
            id_aprendiz: aprendiz.id_aprendiz,
            arquivo_url,
            link_repositorio,
            codigo_texto
        });

        return res.status(201).json({

            mensagem: "Entrega enviada com sucesso",
            id_entrega
        });

    } catch (erro) {

        console.log(erro);

        return res.status(500).json({
            erro: erro.message
        });
    }
}

export async function listar(req, res) {

    try {

        const entregas = await listarEntregas();
         console.log(entregas);

        return res.json(entregas);

    } catch (erro) {

        console.log(erro);

        return res.status(500).json({
            erro: erro.message
        });
    }
}

export async function buscarPorId(req, res) {

    try {

        const { id } = req.params;

        const entrega = await buscarEntregaPorId(id);

        if (!entrega) {

            return res.status(404).json({
                erro: "Entrega não encontrada"
            });
        }

        return res.json(entrega);

    } catch (erro) {

        console.log(erro);

        return res.status(500).json({
            erro: erro.message
        });
    }
}

export async function listarPorTarefa(req, res) {

    try {

        const { id } = req.params;

        const entregas = await listarEntregasPorTarefa(
            id
        );

        return res.json(entregas);

    } catch (erro) {

        console.log(erro);

        return res.status(500).json({
            erro: erro.message
        });
    }
}

export async function atualizarStatus(req, res) {

    try {
        

        const { id } = req.params;

        const { status } = req.body;

        const usuario = req.usuario;
        // Apenas profissional
        if (usuario.tipo_usuario !== "Profissional") {

            return res.status(403).json({
                erro: "Apenas profissionais podem avaliar entregas"
            });
        }

        const atualizado =
            await atualizarStatusEntrega(
                id,
                status
            );

        if (atualizado === 0) {

            return res.status(404).json({
                erro: "Entrega não encontrada"
            });
        }

        return res.json({
            mensagem: "Status atualizado"
        });

    } catch (erro) {

        console.log(erro);

        return res.status(500).json({
            erro: erro.message
        });
    }
}

export async function deletar(req, res) {

    try {

        const { id } = req.params;

        const deletado = await deletarEntrega(id);

        if (deletado === 0) {

            return res.status(404).json({
                erro: "Entrega não encontrada"
            });
        }

        return res.json({
            mensagem: "Entrega deletada"
        });

    } catch (erro) {

        console.log(erro);

        return res.status(500).json({
            erro: erro.message
        });
    }
}
