import { connectDatabase } from "../config/connectDatabase";
import { NextFunction, Request, Response } from "express";
import { User } from "../entity/user/User";
import * as bcrypt from "bcrypt";

export class UserController {
  private userRepository = connectDatabase.getRepository(User);

  async all(request: Request, response: Response, next: NextFunction) {
    const users = await this.userRepository.find();
    if (!users) {
      return response.status(204).json({ message: "No employees found!" });
    }
    response.status(200).json(users);
  }

  async one(request: Request, response: Response, next: NextFunction) {
    const id = parseInt(request.params.id);

    const user = await this.userRepository.findOne({
      where: { id },
    });

    if (!user) {
      return response.status(404).json({ message: `No emp` });
    }
    return response.json(user);
  }

  async save(request: Request, response: Response, next: NextFunction) {
    const { firstname, lastname, username, password } = request.body;
    if (!firstname || !lastname || !username || !password) {
      return response.status(400).json({
        message: "Firstname, Lastname, Username and Password are required!",
      });
    }
    const duplicate = await this.userRepository.find({
      where: {
        username: username,
      },
    });
    console.log("Duplicate: ", duplicate);
    // if (duplicate) {
    //   return response.status(409).json({ message: "Username already exists!" });
    // }

    try {
      const hashedpwd = await bcrypt.hash(password, 10);
      const user = Object.assign(new User(), {
        firstname,
        lastname,
        username,
        password: hashedpwd,
        refreshToken: 'asd'
      });
      const savedUser = await this.userRepository.save(user);
      console.log("Saved user: ", savedUser);
      response.status(201).json({ success: `New user ${savedUser} created!` });
    } catch (error) {
      response.status(500).json({ message: error.message });
    }
  }

  async remove(request: Request, response: Response, next: NextFunction) {
    const id = parseInt(request.params.id);

    const userToRemove = await this.userRepository.findOneBy({ id });

    if (!userToRemove) {
      throw Error(`User with _id:${id} not exist`);
    }
    await this.userRepository.remove(userToRemove);

    return `User with _id:${id} has been removed`;
  }
}
