import express from "express";
import { listaUsuarios, listaUsuarioID, cadastraUsuario, atualizaUsuario, deletaUsuario, listaUsuarios_ingressos, listaUsuario_ingressos } from "../Controllers/UsuarioController.js"

const router = express.Router();

router.get("/", listaUsuarios);
router.get("/:ID", listaUsuarioID);
router.post("/", cadastraUsuario);
router.put("/:ID", atualizaUsuario);
router.delete("/:ID", deletaUsuario);
router.get("/ingressos_usuarios", listaUsuarios_ingressos);
router.get("/ingressos_usuarios/:ID_usuario", listaUsuario_ingressos);

export default router;