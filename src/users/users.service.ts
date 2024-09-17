import { Injectable } from '@nestjs/common';

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
      return this.users.filter((user) => user.role === role);
    }

    return this.users;
  }

  findOne(id: number) {
    const user = this.users.find((user) => user.id === id);

    return user;
  }

  create(user: {
    name: string;
    email: string;
    role: 'INTERN' | 'ENGINEER' | 'ADMIN';
  }) {
    const newUser = {
      id: this.users.length + 1,
      ...user,
    };

    this.users.push(newUser);
    return newUser;
  }

  update(
    id: number,
    updatedUser: {
      name?: string;
      email?: string;
      role?: 'INTERN' | 'ENGINEER' | 'ADMIN';
    },
  ) {
    this.users = this.users.map((user) => {
      if (user.id === id) {
        return { ...user, ...updatedUser };
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
