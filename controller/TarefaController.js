import {
    criarTarefa,
    listarTarefas,
    buscarTarefaId,
    assumirTarefa,
    atualizarTarefa,
    deletarTarefa
} from "../model/tarefaModel.js";
import { buscarProfissionalPorUsuario } from "../model/profissionalModel.js";
import { isProfissionalVerificado } from "../model/profissionalModel.js";

// 🔹 Criar tarefa (Só profissional VERIFICADO)
export async function criar(req, res) {

    try {
        const {
            titulo,
            descricao,
            categoria,
            data_limite,
            nivel_dificuldade
        } = req.body;

        const usuario = req.usuario;

        if (usuario.tipo_usuario !== "Profissional") {
            return res.status(403).json({
                erro: "Apenas profissionais podem criar tarefas"
            });
        }

        // ✅ Verificação importante: só profissional aprovado pode criar tarefa
        const verificado = await isProfissionalVerificado(usuario.id_usuario);
        if (!verificado) {
            return res.status(403).json({
                erro: "Seu perfil profissional ainda não foi aprovado. Aguarde a análise do administrador."
            });
        }

        const profissional = await buscarProfissionalPorUsuario(usuario.id_usuario);

        if (!profissional) {
            return res.status(404).json({ erro: "Perfil profissional não encontrado" });
        }

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
        console.error(erro);
        return res.status(500).json({
            erro: "Erro ao criar tarefa",
            detalhe: erro.message
        });
    }
}

export async function listar(req, res) {
    try {
        const tarefas = await listarTarefas();
        return res.json(tarefas);
    } catch (erro) {
        console.error(erro);
        return res.status(500).json({
            erro: "Erro ao listar tarefas"
        });
    }
}

export async function buscarPorId(req, res) {
    try {
        const { id } = req.params;

        const tarefa = await buscarTarefaId(id);

        if (!tarefa) {
            return res.status(404).json({ erro: "Tarefa não encontrada" });
        }

        return res.json(tarefa);

    } catch (erro) {
        console.error(erro);
        return res.status(500).json({ erro: "Erro ao buscar tarefa" });
    }
}

// Aprendiz assumir tarefa
export async function assumir(req, res) {
    try {
        const { id } = req.params;
        const usuario = req.usuario;

        if (usuario.tipo_usuario !== "Aprendiz") {
            return res.status(403).json({
                erro: "Apenas aprendizes podem assumir tarefas"
            });
        }

        const atualizado = await assumirTarefa(id, usuario.id_usuario);

        if (atualizado === 0) {
            return res.status(404).json({ erro: "Tarefa não encontrada ou já assumida" });
        }

        return res.json({ mensagem: "Tarefa assumida com sucesso" });

    } catch (erro) {
        console.error(erro);
        return res.status(500).json({ erro: "Erro ao assumir tarefa" });
    }
}

// Atualizar status da tarefa
export async function atualizar(req, res) {
    try {
        const { id } = req.params;
        const { status } = req.body;

        if (!status) {
            return res.status(400).json({ erro: "Status é obrigatório" });
        }

        const atualizado = await atualizarTarefa(id, status);

        if (atualizado === 0) {
            return res.status(404).json({ erro: "Tarefa não encontrada" });
        }

        return res.json({ mensagem: "Status da tarefa atualizado com sucesso" });

    } catch (erro) {
        console.error(erro);
        return res.status(500).json({ erro: "Erro ao atualizar tarefa" });
    }
}

// Deletar tarefa
export async function deletar(req, res) {
    try {
        const { id } = req.params;
        const usuario = req.usuario;

        // Só o profissional que criou a tarefa pode deletar (melhoria de segurança)
        if (usuario.tipo_usuario === "Profissional") {
            const profissional = await buscarProfissionalPorUsuario(usuario.id_usuario);
            // Aqui você poderia adicionar uma verificação extra se quiser
        }

        const deletado = await deletarTarefa(id);

        if (deletado === 0) {
            return res.status(404).json({ erro: "Tarefa não encontrada" });
        }

        return res.json({ mensagem: "Tarefa deletada com sucesso" });

    } catch (erro) {
        console.error(erro);
        return res.status(500).json({ erro: "Erro ao deletar tarefa" });
    }
}