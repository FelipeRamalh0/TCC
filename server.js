import express from "express";
import cors from "cors";
import { usuariosRoutes } from "./routes/usuarioRoute.js";

const PORT= process.env.PORT || 3000;

const app= express();
app.use(express.json());;
app.use(cors());


app.use(usuariosRoutes);




app.listen(PORT, ()=>{
    console.log(`Servidor rodando em: http://localhost:${PORT}`);
})