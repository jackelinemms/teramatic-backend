import express from "express";
const app = express();

import cors from "cors";
app.use(cors());

app.use(express.json());

import db from "./config/database.js";
db.connect();

import router from "./routes/userRoutes.js";

//definir a rota principal da minha API
// o segundo parâmetro - router - vai pegar as configurações do userRoutes
app.use("/users", router);

export default app;
