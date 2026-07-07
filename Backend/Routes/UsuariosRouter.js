import express from "express";
import { listaUsuarios, listaUsuarioID, cadastraUsuario, atualizaUsuario, deletaUsuario } from "../Controllers/UsuarioController.js"

const router = express.Router();

router.get("/", listaUsuarios);
router.get("/:ID", listaUsuarioID);
router.post("/", cadastraUsuario);
router.put("/:ID", atualizaUsuario);
router.delete("/:ID", deletaUsuario);

export default router;