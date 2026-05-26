import { Router } from "express";

import {

    criar,
    listar,
    buscarPorId,
    listarPorTarefa,
    atualizarStatus,
    deletar

} from "../controller/entregaController.js";

import {
    verificarToken
} from "../middleware/authMiddleware.js";

const router = Router();


// Criar entrega
router.post(
    "/entregas",
    verificarToken,
    criar
);


// Listar entregas
router.get(
    "/entregas",
    verificarToken,
    listar
);


// Buscar entrega por ID
router.get(
    "/entregas/:id",
    verificarToken,
    buscarPorId
);


// Listar entregas de uma tarefa
router.get(
    "/tarefas/:id/entregas",
    verificarToken,
    listarPorTarefa
);


// Atualizar status da entrega
router.put(
    "/entregas/:id/status",
    verificarToken,
    atualizarStatus
);


// Deletar entrega
router.delete(
    "/entregas/:id",
    verificarToken,
    deletar
);

export const entregaRoutes = router;