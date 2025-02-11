import { CarrierStatus } from "../../shared/enums/carrier";
import BaseEntity from "./BaseEntity";

export default class Carrier extends BaseEntity {
  constructor(
    public name: string,
    public status: CarrierStatus,
    public shiftStart: string,
    public shiftEnd: string
  ) {
    super();
  }

  isWithinWorkingHours(): boolean {
    const now = new Date();
    const currentHour = now.getHours();
    const currentMinutes = now.getMinutes();
    const currentTime = `${currentHour}:${currentMinutes}`;

    return currentTime >= this.shiftStart && currentTime <= this.shiftEnd;
  }
}
