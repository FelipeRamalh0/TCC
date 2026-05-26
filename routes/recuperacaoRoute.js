import { Router } from "express";

import {
    esqueciSenha,
    redefinirSenha
}
from "../controller/recuperacaoController.js";

const router = Router();

router.post(
    "/esqueci-senha",
    esqueciSenha
);

router.post(
    "/redefinir-senha/:token",
    redefinirSenha
);

export const recuperacaoRoutes = router;