import { Injectable, Options } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import * as bcrypt from "bcrypt";
import { UserService } from "../user/user.service";
import { User } from "../../entities";

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly userService: UserService
  ) {}

  async signUp(email: string, password: string): Promise<User> {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    return this.userService.create(email, hashedPassword);
  }

  async signIn(email: string, password: string): Promise<string> {
    const user = await this.userService.findOne(email);
    if (!user) {
      throw new Error("User not found");
    }
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      throw new Error("Invalid credentials");
    }
    return this.jwtService.sign(
      { userId: user.id, userEmail: user.email },
      { secret: process.env.JWT_SECRET }
    );
  }
}
