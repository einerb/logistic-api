import { Package } from "../../../../domain/entities";

export default class CreateShippingOrderResponseDTO {
  id: string;
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
    packages: {
      id: string;
      weight: number;
      dimensions: { length: number; width: number; height: number };
      productType: string;
    }[],
    destinationAddress: {
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
    this.packages = packages;
    this.destinationAddress = destinationAddress;
    this.status = status;
    this.createdAt = createdAt;
  }

  static fromEntity(shippingOrder: any): CreateShippingOrderResponseDTO {
    return new CreateShippingOrderResponseDTO(
      shippingOrder.order.id,
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
