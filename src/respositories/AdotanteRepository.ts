import { Repository } from "typeorm";
import AdotanteEntity from "../entities/AdotanteEntity";

export default class AdotanteRepository {
  private repository: Repository<AdotanteEntity>;
   constructor(repository: Repository<AdotanteEntity>) {
      this.repository = repository;
    }

  async criaAdotante(adotante: AdotanteEntity): Promise<void> {
    await this.repository.save(adotante);
  }
}
