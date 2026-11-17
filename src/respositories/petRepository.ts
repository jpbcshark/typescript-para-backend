import { Repository } from "typeorm";
import PetEntity from "../entities/PetEntity";

export default class PetRepository {
    private repository:Repository<PetEntity>;

   constructor(repository: Repository<PetEntity>){
        this.repository = repository;
   }
    async criaPet(pet: PetEntity): Promise<PetEntity> {
        return this.repository.save(pet);
    }
    async listaPet(): Promise<Array<PetEntity>> {
        return await this.repository.find();
    }
    async atualizaPet(id: number, pet: PetEntity): Promise<void> {
        await this.repository.update(id, pet);
    }
    async deletaPet(id: number, pet: PetEntity): Promise<void> {
        await this.repository.delete(id);
    }
}