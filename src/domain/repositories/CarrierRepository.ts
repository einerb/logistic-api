import { Carrier } from "../entities";

export default interface CarrierRepository {
  save(carrier: Carrier): Promise<void>;
  findById(id: string): Promise<Carrier | null>;
  findByName(name: string): Promise<Carrier | null>;
  find(): Promise<Carrier[]>;
}
