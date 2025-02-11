import { CarrierStatus } from "../../shared/enums/carrier";
import { Carrier } from "../entities";

export default class CarrierAvailabilityService {
  isAvailable(carrier: Carrier): boolean {
    if (carrier.status !== CarrierStatus.AVAILABLE) {
      return false;
    }

    if (!carrier.isWithinWorkingHours()) {
      return false;
    }

    return true;
  }
}
