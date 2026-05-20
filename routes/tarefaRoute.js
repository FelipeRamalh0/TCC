import { Router } from "express";
import {
    criar,
    listar,
    buscarPorId,
    assumir,
    atualizar,
    deletar
} from "../controller/TarefaController.js";

import { 
    verificarToken,
    verificarProfissionalVerificado   // ← Novo middleware
} from "../middleware/authMiddleware.js";

const router = Router();

// ====================== ROTAS DE TAREFAS ======================

// Criar tarefa → Só Profissional VERIFICADO pode criar
router.post("/tarefas", 
    verificarToken, 
    verificarProfissionalVerificado,     // ← Proteção importante
    criar
);

// Listar todas as tarefas
router.get("/tarefas", verificarToken, listar);

// Buscar tarefa por ID
router.get("/tarefas/:id", verificarToken, buscarPorId);

// Aprendiz assumir tarefa
router.put("/tarefas/:id/assumir", verificarToken, assumir);

// Atualizar status da tarefa
router.put("/tarefas/:id/status", verificarToken, atualizar);

// Deletar tarefa
router.delete("/tarefas/:id", verificarToken, deletar);

export const tarefaRoutes = router;