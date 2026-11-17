import { Request, Response } from "express";
import type TipoPet from "../tipos/TipoPet";
import EnumEspecie from "../enum/EnumEspecie";
import { error } from "console";
import PetRepository from "../respositories/petRepository";
import PetEntity from "../entities/PetEntity";

let listaDePets:Array<TipoPet> = [];

export default class PetController {
    constructor(private repository: PetRepository){

    }
    async criaPet(req: Request, res: Response) {
        const {adotado,especie,dataDeNascimento,nome} = req.body as PetEntity;
            if(!Object.values(EnumEspecie).includes(especie)){
                return res.status(400).json({error: "Espécie Inválida"})
            }

        const novoPet = new PetEntity();
        (novoPet.adotado = adotado);
        (novoPet.especie = especie);
        (novoPet.dataDeNascimento = dataDeNascimento);
        (novoPet.nome = nome);
        await this.repository.criaPet(novoPet);
        return res.status(201).json(novoPet);
    }

    async listaPets(req: Request, res: Response) {
        const listaDePets = await this.repository.listaPet();
        return res.status(200).json(listaDePets);
    }

    atualizaPet(req: Request, res: Response) {
        const {id} = req.params;
        const {adotado, especie, dataDeNascimento, nome} = req.body as TipoPet;
        const pet = listaDePets.find((pet) => pet.id === Number(id));
        if(!pet){
            return res.status(404).json({erro: "Pet não encontrado!"});
        }

        pet.nome = nome;
        pet.dataDeNascimento = dataDeNascimento;
        pet.especie = especie;
        pet.adotado = adotado;
        return res.status(200).json(pet);
    }

    deletaPet(req: Request, res: Response) {
       const {id} = req.params;
        const pet = listaDePets.find((pet) => pet.id === Number(id));
        if(!pet){
            return res.status(404).json({erro: "Pet não encontrado!"});
        }
        const index = listaDePets.indexOf(pet);
        listaDePets.splice(index, 1);
        return res.status(200).json({mensagem: "Pet deletado com sucesso!"})
    }
}