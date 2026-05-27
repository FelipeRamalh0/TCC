import { Router } from "express";
import { cadastrar, login } from "../controller/authController.js";
import path from "path";
const router= Router();

router.post('/cadastrar', cadastrar);
router.post('/login', login);




export const usuariosRoutes= router;