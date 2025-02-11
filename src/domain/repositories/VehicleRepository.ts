import { Vehicle } from "../entities";

export default interface VehicleRepository {
  save(vehicle: Vehicle): Promise<void>;
  findByPlate(id: string): Promise<Vehicle | null>;
  find(): Promise<Vehicle[]>;
}
