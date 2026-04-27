import mysql from "mysql2/promise.js";
import dotenv from "dotenv";

dotenv.config();

export const dbConfig = async () => {
    try {
        const connection = await mysql.createConnection({
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_DATABASE
        });

        console.log("Conectado ao Banco de Dados");
        return connection;

    } catch (error) {
        console.error("Erro ao conectar no banco", error);
        throw error;
    }
};