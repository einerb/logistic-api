import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import UserRepository from "../../../domain/repositories/UserRepository";

export default class LoginUserUseCase {
  constructor(private userRepository: UserRepository) {}

  async execute(email: string, password: string): Promise<string | null> {
    const user = await this.userRepository.findByEmail(email);
    if (!user) return null;

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) return null;

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
