import { Router } from "express";
import { cadastrar, login, deletarMinhaConta } from "../controller/authController.js";
import {verificarToken} from "../middleware/authMiddleware.js"
const router= Router();

router.post('/cadastrar', cadastrar);
router.post('/login', login);
router.delete('/deletar', verificarToken, deletarMinhaConta);



export const usuariosRoutes= router;