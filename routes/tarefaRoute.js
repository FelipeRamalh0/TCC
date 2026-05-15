import { Router } from "express";
import {
    criar,
    listar,
    buscarPorId,
    assumir,
    atualizar,
    deletar
} from "../controller/TarefaController.js"

import { verificarToken } from "../middleware/authMiddleware.js"
const router = Router();
router.post("/tarefas", verificarToken, criar);
router.get("/tarefas", verificarToken, listar);
router.get("/tarefas/:id", verificarToken, buscarPorId);
router.put("/tarefas/:id/assumir", verificarToken, assumir);
router.put("/tarefas/:id/status", verificarToken, atualizar);
router.delete("/tarefas/:id", verificarToken, deletar);
export const tarefaRoutes = router;