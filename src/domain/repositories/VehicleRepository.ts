import { Vehicle } from "../entities";

export default interface VehicleRepository {
  save(vehicle: Vehicle): Promise<void>;
  findById(id: string): Promise<Vehicle | null>;
  findByPlate(licensePlate: string): Promise<Vehicle | null>;
  find(): Promise<Vehicle[]>;
}
