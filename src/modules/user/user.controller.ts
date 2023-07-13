import { Body, Controller, Get, Post } from "@nestjs/common";
import { UserService } from "./user.service";

@Controller("users")
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  async index() {
    const users = this.userService.getUsers();
    return users;
  }

  @Post("create")
  async createUser(
    @Body("email") email: string,
    @Body("password") password: string
  ) {
    return await this.userService.create(email, password);
  }
}
