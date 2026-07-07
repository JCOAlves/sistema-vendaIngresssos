import express from "express";
import dotenv from "dotenv";
import SincronizacaoBD from "./Config/SincronizacaoBD.js";
import EventosRouter from "./Routes/EventosRouter.js";
import IngressosRouter from "./Routes/IngressosRouter.js";
import UsuariosRouter from "./Routes/UsuariosRouter.js";

dotenv.config();

const App = express();
const PORT = process.env.PortBack;

SincronizacaoBD();

App.use(express.json());

App.use("/eventos", EventosRouter);
App.use("/ingressos", IngressosRouter);
App.use("/usuarios", UsuariosRouter);

App.listen(PORT, (req, res) => {
    console.log(`Servidor Web rondando na porta ${PORT}`);
});
