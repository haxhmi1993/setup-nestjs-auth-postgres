import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entities';
import { Repository } from 'typeorm';
@Injectable()
export class UserService {
  constructor(@InjectRepository(User) private userRepository: Repository<User>) {}

  async create(email: string, password: string): Promise<User> {
    const user = this.userRepository.create({ email, password });
    return this.userRepository.save(user);
  }
  
  async findOne(email: string): Promise<User | undefined> {
    return this.userRepository.findOne({
      where:{
        email
      }
    })
  }


  async getUsers(){
    return this.userRepository.find({})
  }
}
