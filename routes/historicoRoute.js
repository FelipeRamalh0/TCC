import { Router } from "express";

import {

    listar,
    buscarPorId,
    meuHistorico,
    ranking

} from "../controller/historicoController.js";

import {
    verificarToken
} from "../middleware/authMiddleware.js";

const router = Router();


router.get("/historico", verificarToken, listar);
router.get("/historico/:id", verificarToken, buscarPorId);
router.get( "/meu-historico", verificarToken, meuHistorico);
router.get("/ranking",verificarToken, ranking);


export const historicoRoutes = router;