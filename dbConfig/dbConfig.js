import mysql from "mysql2/promise";
import dotenv from "dotenv";

dotenv.config();

export const db = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    port: 3306
});

db.getConnection()
    .then(() => {
        console.log("BANCO CONECTADO");
    })
    .catch((erro) => {
        console.log("ERRO AO CONECTAR NO BANCO:");
        console.log(erro);
    });

