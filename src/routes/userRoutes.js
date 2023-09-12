import express from "express";
const router = express.Router();

import controllers from "../controllers/userController.js";

router.get("/", controllers.getAll); //rota pro metodo de find
router.post("/", controllers.createUser); // rota pro metodo de criar usuario
router.patch("/:id", controllers.updateUser); //rota para método de atualizar o usuário
router.patch("/:id", controllers.deleteUser); //rota pra método de deletar o usuário

export default router;
