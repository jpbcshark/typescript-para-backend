// adotanteRouter.ts
import express from "express";
import AdotanteController from "../controller/AdotanteController";
import AdotanteRepository from "../respositories/AdotanteRepository";
import { AppDataSource } from "../config/dataSource";

const router = express.Router();
const adotanteRepository = new AdotanteRepository(
  AppDataSource.getRepository("AdotanteEntity")
);
const adotanteController = new AdotanteController();

router.post("/", (req, res) => adotanteController.criaAdotante(req, res)); // Rota para criar um adotante

export default router;