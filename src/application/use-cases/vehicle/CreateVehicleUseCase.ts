import { Vehicle } from "../../../domain/entities";
import { VehicleRepository } from "../../../domain/repositories";
import { ApiError } from "../../../shared/utils/api-error";
import { CreateVehicleDTO } from "../../dtos";

export default class CreateVehicleUseCase {
  constructor(private readonly vehicleRepository: VehicleRepository) {}

  async execute(dto: CreateVehicleDTO) {
    const vehicleExist = await this.vehicleRepository.findByPlate(
      dto.licensePlate
    );
    if (vehicleExist) {
      new ApiError(400, "Vehicle already exists!");
    }

    const vehicle = new Vehicle(
      dto.capacityVolumenMax,
      dto.capacityWeightMax,
      dto.model,
      dto.licensePlate
    );

    return this.vehicleRepository.save(vehicle);
  }
}
