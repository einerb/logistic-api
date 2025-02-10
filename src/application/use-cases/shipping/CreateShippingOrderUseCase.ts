import Address from "../../../domain/entities/Address";
import ShippingOrder from "../../../domain/entities/ShippingOrder";
import ValidationAddressService from "../../../domain/services/ValidationAddressService";
import { Package, User } from "../../../domain/entities";
import { ApiError } from "../../../shared/utils/api-error";
import { CreatePackageDTO, CreateShippingOrderResponseDTO } from "../../dtos";
import {
  ShippingOrderRepository,
  PackageRepository,
} from "../../../domain/repositories";

export default class CreateShippingOrderUseCase {
  private readonly MAX_PACKAGES_PER_ORDER = 10;
  private readonly MAX_ORDERS_PER_ADDRESS_PER_DAY = 2;

  constructor(
    private shippingOrderRepository: ShippingOrderRepository,
    private packageRepository: PackageRepository,
    private addressValidationService: ValidationAddressService
  ) {}

  async execute(
    user: User,
    packageDto: CreatePackageDTO[],
    destinationAddress: Address
  ): Promise<CreateShippingOrderResponseDTO> {
    if (packageDto.length > this.MAX_PACKAGES_PER_ORDER) {
      throw new ApiError(
        400,
        `You can only send up to ${this.MAX_PACKAGES_PER_ORDER} packages per order!`
      );
    }

    const today = new Date();
    const ordersCount =
      await this.shippingOrderRepository.countOrdersByAddressAndDate(
        destinationAddress,
        today,
        user.id
      );
    if (ordersCount >= this.MAX_ORDERS_PER_ADDRESS_PER_DAY) {
      throw new ApiError(
        400,
        `You can only send up to ${this.MAX_ORDERS_PER_ADDRESS_PER_DAY} orders to this address per day!`
      );
    }

    const { isValid, coordinates } =
      await this.addressValidationService.validateAddress(destinationAddress);
    if (!isValid) {
      throw new ApiError(400, "Invalid destination address!");
    }

    destinationAddress.coordinates = coordinates;

    const order = new ShippingOrder(user, [], destinationAddress);
    await this.shippingOrderRepository.save(order);

    const packages = packageDto.map((pkgDto) => {
      const packageInstance = new Package(
        order.id,
        pkgDto.weight,
        pkgDto.dimensions,
        pkgDto.productType
      );

      return packageInstance;
    });

    for (const pkg of packages) {
      await this.packageRepository.save(pkg);
    }

    return CreateShippingOrderResponseDTO.fromEntity({ order, packages });
  }
}
