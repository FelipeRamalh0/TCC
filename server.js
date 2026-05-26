import express from "express";
import cors from "cors";
import path from "path"
import { usuariosRoutes } from "./routes/usuarioRoute.js";
import { tarefaRoutes } from "./routes/tarefaRoute.js";
import { recuperacaoRoutes } from "./routes/recuperacaoRoute.js"
import { entregaRoutes} from "./routes/entregaRoute.js"
const PORT= process.env.PORT || 3000;

const app= express();
app.use(express.json());;
app.use(cors());
app.use(express.static("view"));

app.get("/", (req, res) => {
    res.sendFile(path.resolve("view/index.html"));
});

app.use(usuariosRoutes);
app.use(tarefaRoutes);
app.use(recuperacaoRoutes);
app.use(entregaRoutes)


app.listen(PORT, ()=>{
    console.log(`Servidor rodando em: http://localhost:${PORT}`);
})