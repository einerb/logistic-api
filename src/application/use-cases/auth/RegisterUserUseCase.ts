import bcrypt from "bcryptjs";

import UserRepository from "../../../domain/repositories/UserRepository";
import User from "../../../domain/entities/User";
import { UserRoleEnum } from "../../../shared/enums/role";
import { RegisterUserResponseDTO } from "../../dtos";

export default class RegisterUserUseCase {
  constructor(private userRepository: UserRepository) {}

  async execute(
    name: string,
    lastname: string,
    email: string,
    password: string,
    role: UserRoleEnum
  ): Promise<RegisterUserResponseDTO> {
    const existingUser = await this.userRepository.findByEmail(email);

    if (existingUser) {
      throw new Error("User is already registered with this email!");
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User(name, lastname, email, hashedPassword, role, true);

    await this.userRepository.save(user);

    return RegisterUserResponseDTO.fromEntity(user);
  }
}
