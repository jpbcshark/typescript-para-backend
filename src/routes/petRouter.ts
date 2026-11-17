import express from "express";
import PetController from "../controller/PetController";
import PetRepository from "../respositories/petRepository";
import { AppDataSource } from "../config/dataSource";

const router=express.Router();
const petRepository = new PetRepository(AppDataSource.getRepository("PetEntity"))

const petController = new PetController(petRepository);
router.post("/",(req, res, next)=>  petController.criaPet(req, res).catch(next))
router.get("/",(req, res)=>  petController.listaPets(req, res))
router.put("/:id",(req, res)=>  petController.atualizaPet(req, res))
router.delete("/:id",(req, res)=>  petController.deletaPet(req, res))

export default router;
