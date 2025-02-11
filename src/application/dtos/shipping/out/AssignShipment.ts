import { Package } from "../../../../domain/entities";
import { CarrierStatus } from "../../../../shared/enums/carrier";

export default class AssignShippingOrderResponseDTO {
  id: string;
  origin: {
    name: string;
    lastname: string;
    email: string;
  };
  packages: {
    id: string;
    weight: number;
    dimensions: {
      length: number;
      width: number;
      height: number;
    };
    productType: string;
  }[];
  destinationAddress: {
    name: string;
    phone: string;
    street: string;
    city: string;
    state: string;
    postalCode?: string;
    country: string;
    coordinates: {
      lng: number;
      lat: number;
    };
  };
  carrier: {
    name: string;
    status: CarrierStatus;
    shiftStart: string;
    shiftEnd: string;
  };
  vehicle: {
    capacityVolumenMax: number;
    capacityWeightMax: number;
    model: string;
    licensePlate: string;
  };
  route: {
    origin: string;
    destination: string;
    estimatedTime: string;
    distance: string;
  };
  status: string;
  createdAt: Date;

  constructor(
    id: string,
    origin: {
      name: string;
      lastname: string;
      email: string;
    },
    packages: {
      id: string;
      weight: number;
      dimensions: { length: number; width: number; height: number };
      productType: string;
    }[],
    destinationAddress: {
      name: string;
      phone: string;
      street: string;
      city: string;
      state: string;
      postalCode: string;
      country: string;
      coordinates: { lng: number; lat: number };
    },
    carrier: {
      name: string;
      status: CarrierStatus;
      shiftStart: string;
      shiftEnd: string;
    },
    vehicle: {
      capacityVolumenMax: number;
      capacityWeightMax: number;
      model: string;
      licensePlate: string;
    },
    route: {
      origin: string;
      destination: string;
      estimatedTime: string;
      distance: string;
    },
    status: string,
    createdAt: Date
  ) {
    this.id = id;
    this.origin = origin;
    this.packages = packages;
    this.destinationAddress = destinationAddress;
    this.carrier = carrier;
    this.vehicle = vehicle;
    this.route = route;
    this.status = status;
    this.createdAt = createdAt;
  }

  static fromEntity(
    shippingOrder: any,
    route: any
  ): AssignShippingOrderResponseDTO {
    return new AssignShippingOrderResponseDTO(
      shippingOrder.id,
      {
        name: shippingOrder.user.name,
        lastname: shippingOrder.user.lastname,
        email: shippingOrder.user.email,
      },
      shippingOrder.packages.map((pkg: Package) => ({
        id: pkg.id,
        weight: pkg.weight,
        dimensions: {
          length: pkg.dimensions.length,
          width: pkg.dimensions.width,
          height: pkg.dimensions.height,
        },
        productType: pkg.productType,
      })),
      {
        name: shippingOrder.destinationAddress.name,
        phone: shippingOrder.destinationAddress.phone,
        street: shippingOrder.destinationAddress.street,
        city: shippingOrder.destinationAddress.city,
        state: shippingOrder.destinationAddress.state,
        postalCode: shippingOrder.destinationAddress.postalCode,
        country: shippingOrder.destinationAddress.country,
        coordinates: {
          lng: shippingOrder.destinationAddress.coordinates.lng,
          lat: shippingOrder.destinationAddress.coordinates.lat,
        },
      },
      {
        name: route.nameCarrier,
        status: route.statusCarrier,
        shiftStart: route.shiftStart,
        shiftEnd: route.shiftEnd,
      },
      {
        capacityVolumenMax: route.capacityVolumenMax,
        capacityWeightMax: route.capacityWeightMax,
        model: route.model,
        licensePlate: route.licensePlate,
      },
      {
        origin: route.originName,
        destination: route.destinationName,
        estimatedTime: route.estimatedTime,
        distance: route.distanceKm,
      },
      shippingOrder.status,
      shippingOrder.createdAt
    );
  }
}
