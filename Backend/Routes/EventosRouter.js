import express from "express";
import { listaEventos, listaEventoID, cadastraEvento, atualizaEvento, deletaEvento } from "../Controllers/EventoController.js";

const router = express.Router();

router.get("/", listaEventos);
router.get("/:ID", listaEventoID);
router.post("/", cadastraEvento);
router.put("/:ID", atualizaEvento);
router.delete("/:ID", deletaEvento);

export default router;