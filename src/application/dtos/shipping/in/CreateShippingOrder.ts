import { IsArray, ValidateNested } from "class-validator";
import { Type } from "class-transformer";

import CreatePackageDTO from "./CreatePackage";
import CreateAddressDTO from "./CreateAddress";

/**
 * @swagger
 * components:
 *   schemas:
 *     CreateShippingOrderDTO:
 *       type: object
 *       required:
 *         - packages
 *         - destinationAddress
 *       properties:
 *         packages:
 *           type: array
 *           description: List of packages to be shipped
 *           items:
 *             type: object
 *             properties:
 *               weight:
 *                 type: number
 *                 format: float
 *                 example: 5.56
 *                 description: Weight of the package in kilograms
 *               dimensions:
 *                 type: object
 *                 description: Dimensions of the package in centimeters
 *                 properties:
 *                   length:
 *                     type: number
 *                     example: 30
 *                   width:
 *                     type: number
 *                     example: 20
 *                   height:
 *                     type: number
 *                     example: 15
 *               productType:
 *                 type: string
 *                 example: "Electronics"
 *                 description: Type of product inside the package
 *         destinationAddress:
 *           type: object
 *           description: Address where the shipment is to be delivered
 *           required:
 *             - name
 *             - street
 *             - city
 *             - state
 *             - postalCode
 *             - country
 *           properties:
 *             name:
 *               type: string
 *               example: "Juan Peréz"
 *             phone:
 *               type: string
 *               example: "3211233212"
 *             street:
 *               type: string
 *               example: "Cl. 69c #2-4"
 *             city:
 *               type: string
 *               example: "Barranquilla"
 *             state:
 *               type: string
 *               example: "AT"
 *             postalCode:
 *               type: string
 *               example: "083010"
 *             country:
 *               type: string
 *               example: "Colombia"
 *             coordinates:
 *               type: object
 *               description: Geographic coordinates of the destination
 *               required:
 *                 - lat
 *                 - lng
 *               properties:
 *                 lat:
 *                   type: number
 *                   format: float
 *                   example: 10.961003
 *                 lng:
 *                   type: number
 *                   format: float
 *                   example: -74.815514
 */

export default class CreateShippingOrderDTO {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreatePackageDTO)
  packages!: CreatePackageDTO[];

  @ValidateNested()
  @Type(() => CreateAddressDTO)
  destinationAddress!: CreateAddressDTO;
}
