import Package from "../entities/Package";

export default interface PackageRepository {
  save(pkg: Package): Promise<void>;
  countPackagesByOrderAndDate(orderId: string, date: Date): Promise<number>;
}
