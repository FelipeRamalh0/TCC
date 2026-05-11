import {
    criarTarefa,
    listarTarefas,
    buscarTarefaId,
    assumirTarefa,
    atualizarTarefa,
    deletarTarefa
} from "../model/tarefaModel.js";

export async function criar(req, res) {
    
    try {
        const { id_profissional,
            titulo,
            descricao,
            categoria,
            data_criacao,
            data_limite,
            nivel_dificuldade,
            status_tarefa }= req.body;

            //Ddos vindo do token
            const usuario= req.usuario;

            
    } catch (error) {
        
    }
}