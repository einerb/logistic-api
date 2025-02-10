import { Package } from "../../../../domain/entities";

export default class CreateShippingOrderResponseDTO {
  id: string;
  origin: {
    name: string;
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
  status: string;
  createdAt: Date;

  constructor(
    id: string,
    origin: {
      name: string;
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
    status: string,
    createdAt: Date
  ) {
    this.id = id;
    this.origin = origin;
    this.packages = packages;
    this.destinationAddress = destinationAddress;
    this.status = status;
    this.createdAt = createdAt;
  }

  static fromEntity(shippingOrder: any): CreateShippingOrderResponseDTO {
    return new CreateShippingOrderResponseDTO(
      shippingOrder.order.id,
      {
        name: shippingOrder.order.user.name,
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
        name: shippingOrder.order.destinationAddress.name,
        phone: shippingOrder.order.destinationAddress.phone,
        street: shippingOrder.order.destinationAddress.street,
        city: shippingOrder.order.destinationAddress.city,
        state: shippingOrder.order.destinationAddress.state,
        postalCode: shippingOrder.order.destinationAddress.postalCode,
        country: shippingOrder.order.destinationAddress.country,
        coordinates: {
          lng: shippingOrder.order.destinationAddress.coordinates.lng,
          lat: shippingOrder.order.destinationAddress.coordinates.lat,
        },
      },
      shippingOrder.order.status,
      shippingOrder.order.createdAt
    );
  }
}
