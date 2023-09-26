import express from "express";
const router = express.Router();

import controllers from "../controllers/userController.js";
import login from "../controllers/authController.js";

router.get("/", controllers.getAll); //rota pro metodo de find
router.post("/", controllers.createUser); // rota pro metodo de criar usuario
router.get("/:id", controllers.findUserById); //rota para método de atualizar o usuário
router.patch("/:id", controllers.updateUser); //rota para método de atualizar o usuário
router.delete("/:id", controllers.deleteUser); //rota pra método de deletar o usuário
router.post("/login", login); //rota pra login

export default router;
