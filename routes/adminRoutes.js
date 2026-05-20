import { Router } from "express";
import { verificarToken } from "../middleware/authMiddleware.js";
import { verificarProfissionalVerificado } from "../middleware/authMiddleware.js"; // se quiser
import {
    listarProfissionaisPendentes,
    aprovarProfissional,
    rejeitarProfissional,
    buscarProfissionalParaAnalise
} from "../controllers/adminController.js";

const router = Router();

// Apenas admin deve acessar essas rotas (você pode criar um middleware de admin depois)
router.get('/profissionais/pendentes', verificarToken, listarProfissionaisPendentes);
router.get('/profissionais/:id_profissional', verificarToken, buscarProfissionalParaAnalise);
router.put('/profissionais/:id_profissional/aprovar', verificarToken, aprovarProfissional);
router.put('/profissionais/:id_profissional/rejeitar', verificarToken, rejeitarProfissional);

export default router;