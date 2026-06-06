import { Router } from "express";
import { cadastrar, login, deletar } from "../controller/authController.js";
import path from "path";
const router= Router();

router.post('/cadastrar', cadastrar);
router.post('/login', login);
router.delete('/deletar', deletar);



export const usuariosRoutes= router;