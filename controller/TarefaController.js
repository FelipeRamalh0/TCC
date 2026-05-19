import {
    criarTarefa,
    listarTarefas,
    buscarTarefaId,
    assumirTarefa,
    atualizarTarefa,
    deletarTarefa
} from "../model/tarefaModel.js";
import {buscarProfissionalPorUsuario} from "../model/profissionalModel.js"

// 🔹 Criar tarefa
export async function criar(req, res) {

    try {

        const {
            titulo,
            descricao,
            categoria,
            data_limite,
            nivel_dificuldade
        } = req.body;

        //  Dados vindos do token
        const usuario = req.usuario;

        if (usuario.tipo_usuario !== "Profissional") {
            return res.status(403).json({
                erro: "Apenas profissionais podem criar tarefas"
            });
        }
        const profissional = await buscarProfissionalPorUsuario(
            usuario.id_usuario
        );

        const id_tarefa = await criarTarefa({

            id_profissional: profissional.id_profissional,
            titulo,
            descricao,
            categoria,
            data_limite,
            nivel_dificuldade
        });

        return res.status(201).json({
            mensagem: "Tarefa criada com sucesso",
            id_tarefa
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

        const tarefas = await listarTarefas();

        return res.json(tarefas);

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

        const tarefa = await buscarTarefaId(id);

        if (!tarefa) {
            return res.status(404).json({
                erro: "Tarefa não encontrada"
            });
        }

        return res.json(tarefa);

    } catch (erro) {

        console.log(erro);

        return res.status(500).json({
            erro: erro.message
        });
    }
}




export async function assumir(req, res) {

    try {

        const { id } = req.params;

        const usuario = req.usuario;

        //  Apenas aprendiz pode assumir
        if (usuario.tipo_usuario !== "Aprendiz") {
            return res.status(403).json({
                erro: "Apenas aprendizes podem assumir tarefas"
            });
        }

        const atualizado = await assumirTarefa(
            id,
            usuario.id_usuario
        );

        if (atualizado === 0) {
            return res.status(404).json({
                erro: "Tarefa não encontrada"
            });
        }

        return res.json({
            mensagem: "Tarefa assumida com sucesso"
        });

    } catch (erro) {

        console.log(erro);

        return res.status(500).json({
            erro: erro.message
        });
    }
}




//  Atualizar status
export async function atualizar(req, res) {

    try {

        const { id } = req.params;

        const { status } = req.body;

        const atualizado = await atualizarTarefa(
            id,
            status
        );

        if (atualizado === 0) {
            return res.status(404).json({
                erro: "Tarefa não encontrada"
            });
        }

        return res.json({
            mensagem: "Status atualizado com sucesso"
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

        const deletado = await deletarTarefa(id);

        if (deletado === 0) {
            return res.status(404).json({
                erro: "Tarefa não encontrada"
            });
        }

        return res.json({
            mensagem: "Tarefa deletada com sucesso"
        });

    } catch (erro) {

        console.log(erro);

        return res.status(500).json({
            erro: erro.message
        });
    }
}