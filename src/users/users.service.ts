import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  // 5 - users
  private users = [
    {
      id: 1,
      name: 'Alice Doe',
      email: 'alicedoe@gmail.com',
      role: 'INTERN',
    },
    {
      id: 2,
      name: 'Bob Doe',
      email: 'bobdoe@gmail.com',
      role: 'ENGINEER',
    },
    {
      id: 3,
      name: 'Charlie Doe',
      email: 'charliedoe@gmail.com',
      role: 'ADMIN',
    },
    {
      id: 4,
      name: 'David Doe',
      email: 'daviddoe@gmail.com',
      role: 'INTERN',
    },
    {
      id: 5,
      name: 'Eve Doe',
      email: 'evedoe@gmail.com',
      role: 'ENGINEER',
    },
  ];

  findAll(role?: 'INTERN' | 'ENGINEER' | 'ADMIN') {
    if (role) {
      const rolesArray = this.users.filter((user) => user.role === role);
      if (!rolesArray.length) {
        throw new NotFoundException('User role not found');
      }

      return rolesArray;
    }

    return this.users;
  }

  findOne(id: number) {
    const user = this.users.find((user) => user.id === id);

    if (!user) throw new NotFoundException('User not found');

    return user;
  }

  create(createUserDto: CreateUserDto) {
    const newUser = {
      id: this.users.length + 1,
      ...createUserDto,
    };

    this.users.push(newUser);
    return newUser;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    this.users = this.users.map((user) => {
      if (user.id === id) {
        return { ...user, ...updateUserDto };
      }
      return user;
    });

    return this.findOne(id);
  }

  delete(id: number) {
    const deletedUser = this.findOne(id);

    this.users = this.users.filter((user) => user.id !== id);

    return deletedUser;
  }
}
