import { Carrier } from "../entities";

export default interface CarrierRepository {
  save(carrier: Carrier): Promise<void>;
  findByName(name: string): Promise<Carrier | null>;
  find(): Promise<Carrier[]>;
}
