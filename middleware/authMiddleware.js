import jwt from "jsonwebtoken";

const SECRET = process.env.SECRET;

export function verificarToken(req, res, next) {

    try {
        console.log(req.headers.authorization);

        const authHeader = req.headers.authorization;

        if (!authHeader) {

            return res.status(401).json({
                erro: "Token não fornecido"
            });
        }

        const token = authHeader.split(" ")[1];

        const decoded = jwt.verify(token, SECRET);

        req.usuario = decoded;

        next();

    } catch (error) {

        return res.status(401).json({
            erro: "Token inválido"
        });
    }
}