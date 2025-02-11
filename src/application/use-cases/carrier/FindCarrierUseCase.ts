import { CarrierRepository } from "../../../domain/repositories";

export default class FindCarrierUseCase {
  constructor(private readonly carrierRepository: CarrierRepository) {}

  async execute() {
    return await this.carrierRepository.find();
  }
}
