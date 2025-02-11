import { VehicleRepository } from "../../../domain/repositories";

export default class FindVehicleUseCase {
  constructor(private readonly vehicleRepository: VehicleRepository) {}

  async execute() {
    return await this.vehicleRepository.find();
  }
}
