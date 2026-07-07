import express from "express";
import { listaIngressos, listaIngressoID, cadastraIngresso, atualizaIngresso, deletaIngresso } from "../Controllers/IngressoController.js";

const router = express.Router();

router.get("/", listaIngressos);
router.get("/:ID", listaIngressoID);
router.post("/", cadastraIngresso);
router.put("/:ID", atualizaIngresso);
router.delete("/:ID", deletaIngresso);

export default router;