import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import UserRepository from "../../../domain/repositories/UserRepository";
import { ApiError } from "../../../shared/utils/api-error";

export default class LoginUserUseCase {
  constructor(private userRepository: UserRepository) {}

  async execute(email: string, password: string): Promise<string | null> {
    const user = await this.userRepository.findByEmail(email);
    if (!user) {
      throw new ApiError(404, "User not found!");
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new ApiError(401, "Invalid credentials!");
    }

    const token = jwt.sign(
      { userId: user.id, name: user.name, role: user.role },
      process.env.JWT_SECRET!,
      {
        expiresIn: "1h",
      }
    );

    return token;
  }
}
