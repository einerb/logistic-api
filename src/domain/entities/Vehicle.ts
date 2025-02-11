import BaseEntity from "./BaseEntity";

export default class Vehicle extends BaseEntity {
  constructor(
    public capacityVolumenMax: number,
    public capacityWeightMax: number,
    public model: string,
    public licensePlate: string
  ) {
    super();
  }
}
