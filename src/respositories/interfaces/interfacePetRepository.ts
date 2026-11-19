import PetEntity from "../../entities/PetEntity";
import EnumPorte from "../../enum/EnumPorte";

export default interface InterfacePetRepository {
    criaPet(pet: PetEntity): void;
    listaPet():Array<PetEntity> | Promise<PetEntity>;
    atualizaPet(id:number, pet:PetEntity): Promise<{sucess: boolean; message?: string}> | void;
    deletaPet(id:number): Promise<{sucess: boolean; message?: string}> | void;
    buscarPetPorCampoGenerico<Tipo extends keyof PetEntity>(
    campo: Tipo,
    valor: PetEntity[Tipo]
  ): Promise<PetEntity[]>;
}