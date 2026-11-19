import { Request, Response } from "express";
import type TipoPet from "../tipos/TipoPet";
import EnumEspecie from "../enum/EnumEspecie";
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

        const novoPet = new PetEntity(nome, especie, dataDeNascimento, adotado);
        await this.repository.criaPet(novoPet);
        return res.status(201).json(novoPet);
    }

    async listaPet(req: Request, res: Response) {
        const listaDePets = await this.repository.listaPet();
        return res.status(200).json(listaDePets);
    }

    async atualizaPet(req: Request, res: Response) {
        const {id} = req.params;
        const {adotado, especie, dataDeNascimento, nome} = req.body as TipoPet;

        const newData = new PetEntity(nome, especie, dataDeNascimento, adotado);
        newData.nome = nome;
        newData.dataDeNascimento = dataDeNascimento;
        newData.especie = especie;
        newData.adotado = adotado;

        const result = await this.repository.atualizaPet(Number(id), newData);
        if (!result.success) {
            return res.status(404).json({erro: result.message || "Pet não encontrado!"});
        }
        return res.status(200).json({mensagem: "Pet atualizado com sucesso!"});
    }

    async deletaPet(req: Request, res: Response) {
        const {id} = req.params;
        const result = await this.repository.deletaPet(Number(id), new PetEntity("", undefined as never, undefined as never, false));
        if(!result.success){
            return res.status(404).json({erro: result.message || "Pet não encontrado!"});
        }
        return res.status(200).json({mensagem: "Pet deletado com sucesso!"});
    }

    async adotaPet(req: Request, res: Response) {
        const { pet_id, adotante_id} = req.params;
        const {success, message} = await this.repository.adotaPet(
            Number(pet_id),
            Number(adotante_id)
        );

        if(!success){
            return res.status(404).json({message: "Pet não encontrado para adoção!"})
        }
        res.sendStatus(204);
    }
}