import express from "express";
import cors from "cors";
import { dbConfig } from "./dbConfig/dbConfig.js";
import { usuariosRoutes } from "./routes/usuarioRoute.js";

const PORT= 3000
const app= express();
app.use(express.json());;
app.use(cors());


app.use(usuariosRoutes);




app.listen(PORT, ()=>{
    console.log(`Servidor rodando em: http://localhost:${PORT}`);
})