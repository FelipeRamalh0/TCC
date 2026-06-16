import {

    criarEntrega,
    listarEntregas,
    buscarEntregaPorId,
    buscarEntregaPorTarefaEAprendiz,
    atualizarEntregaReprovada,
    listarEntregasPorTarefa,
    listarEntregasPorProfissional,
    atualizarStatusEntrega,
    deletarEntrega

} from "../model/entregaModel.js";
import {
    atualizarStatusTarefa
} from "../model/tarefaModel.js";
import {
    buscarAprendizIdUsuario
} from "../model/aprendizModel.js";
import {buscarProfissionalPorUsuario} from "../model/profissionalModel.js";

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
        const entregaExistente =
    await buscarEntregaPorTarefaEAprendiz(
        id_tarefa,
        aprendiz.id_aprendiz
    );
    if (
    entregaExistente &&
    entregaExistente.status_entrega === "Aprovado"
) {
    return res.status(400).json({
        erro: "Esta tarefa já foi aprovada."
    });
}
let id_entrega;
if (
    entregaExistente &&
    entregaExistente.status_entrega === "Reprovado"
) {

    await atualizarEntregaReprovada(
        entregaExistente.id_entrega,
        arquivo_url,
        link_repositorio,
        codigo_texto
    );
    await atualizarStatusTarefa(
    id_tarefa,
    "em_revisao"
);
id_entrega = entregaExistente.id_entrega;

} else {

    id_entrega = await criarEntrega({

            id_tarefa,
            id_aprendiz: aprendiz.id_aprendiz,
            arquivo_url,
            link_repositorio,
            codigo_texto
        });
        await atualizarStatusTarefa(
    id_tarefa,
    "em_revisao"
);

}
        

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
export async function listarEntregasProfissional(req, res) {
    try {

        const id_usuario = req.usuario.id_usuario;

        const profissional =
            await buscarProfissionalPorUsuario(id_usuario);

        const entregas =
            await listarEntregasPorProfissional(
                profissional.id_profissional
            );

        return res.json(entregas);

    } catch (erro) {
        console.log(erro)
        return res.status(500).json({
            erro: erro.message
        });

    }
}

export async function atualizarStatus(req, res) {

    try {


        const { id } = req.params;

        const { status, feedback } = req.body;

        const usuario = req.usuario;
        // Apenas profissional
        if (usuario.tipo_usuario !== "Profissional") {

            return res.status(403).json({
                erro: "Apenas profissionais podem avaliar entregas"
            });
        }

        if (!feedback || !feedback.trim()) {
            return res.status(400).json({
                erro: "Feedback obrigatório"
            });
        }

        const atualizado =
            await atualizarStatusEntrega(
                id,
                status,
                feedback
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
