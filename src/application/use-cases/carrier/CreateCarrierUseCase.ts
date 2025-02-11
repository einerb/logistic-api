import { Carrier } from "../../../domain/entities";
import { CarrierRepository } from "../../../domain/repositories";
import { ApiError } from "../../../shared/utils/api-error";
import { CreateCarrierDTO } from "../../dtos";

export default class CreateCarrierUseCase {
  constructor(private readonly carrierRepository: CarrierRepository) {}

  async execute(dto: CreateCarrierDTO) {
    const carrierExist = await this.carrierRepository.findByName(dto.name);
    if (carrierExist) {
      new ApiError(400, "Carrier already exists!");
    }

    const carrier = new Carrier(
      dto.name,
      dto.status,
      dto.shiftStart,
      dto.shiftEnd
    );

    return this.carrierRepository.save(carrier);
  }
}
