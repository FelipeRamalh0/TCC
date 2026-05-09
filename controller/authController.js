import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import { criarUsuario, buscarEmail } from "../model/usuarioModel.js";
import { criarAprendiz } from "../model/aprendizModel.js";
import { criarProfissional } from "../model/profissionalModel.js";

const SECRET = "segredo_super_secreto";

export async function cadastrar(req, res) {
    console.log("1")
    try {
        console.log("2")
        const { nome, email, senha, tipo_usuario, nivel_experiencia, empresa, cargo, bio } = req.body;
        console.log("3")
        //Verificar se o usuario com este email ja existe
        const usuarioExistente= await buscarEmail(email);
        console.log("4")
        if(usuarioExistente){
            return res.status(400).json({erro: "Email já cadastrado"})
        }

        const senha_hash= await bcrypt.hash(senha, 10);

        //Criar usuario
        const id_usuario= await criarUsuario({nome, email, senha_hash, tipo_usuario});

        //Criar usuario específico
        if(tipo_usuario==="Aprendiz"){await criarAprendiz({id_usuario, nivel_experiencia, bio})}
        else{await criarProfissional({id_usuario, empresa, cargo, bio})};
         return res.status(201).json({mensagem: "Usuário criado com sucesso", id_usuario})

    } catch (erro) {
       console.error(erro);
        res.status(500).json({erro: "Erro no servidor"})
    }
}

export async function login(req, res) {
    try{
    const {email, senha}= req.body;
    const usuario= await buscarEmail(email);
    if(!usuario){
        return res.status(404).json({erro: "Usuário não encontrado"});
    } 
    //Comparar Senha
    const senhaValida= await bcrypt.compare(senha, usuario.senha_hash);

    if(!senhaValida){
        return res.status(401).json({erro: "Senha inválida"});
    }
//Gerar token
    const token= jwt.sign(
        {
            id: usuario.id_usuario,
            tipo: usuario.tipo_usuario
        },
        SECRET,
        {expiresIn: "1d"}
    );

    return res.json({
        mensagem: "Login realizado com sucesso",
        token,
        usuario : {
            id: usuario.id_usuario,
            nome: usuario.nome,
            tipo: usuario.tipo_usuario
        }
    })
    }catch(erro){
        
          console.log(erro);

    return res.status(500).json({
        erro: "Erro no servidor"
    })
    }
}

