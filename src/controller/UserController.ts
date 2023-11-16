import * as bcrypt from "bcrypt";
import { NextFunction, Request, Response } from "express";
import { connectDatabase } from "../config/connectDatabase";
import { User } from "../entity/user/User";

export class UserController {
  private userRepository = connectDatabase.getRepository(User);

  

  async all(request: Request, response: Response, next: NextFunction) {
    const users = await this.userRepository.find();
    if (!users) {
      response.status(204);
      return { message: "No employees found!" };
    }
    response.status(200).json(users);
  }

  async one(request: Request, response: Response, next: NextFunction) {
    const id = parseInt(request.params.id);

    const user = await this.userRepository.findOne({
      where: { id },
    });

    if (!user) {
      return response.status(404).json({ message: "User not found" });
    }
    response.json(user);
  }

  async registerUser(request: Request, response: Response, next: NextFunction) {
    const { firstname, lastname, username, password } = request.body;

    if (!firstname || !lastname || !username || !password) {
      return response.status(400).json({
        message: "Firstname, Lastname, Username, and Password are required!",
      });
    }

    const duplicate = await this.userRepository.findOne({
      where: { username },
    });

    if (duplicate) {
      return response.status(409).json({ message: "User already exist" });
    }


    const hashedpwd = await bcrypt.hash(password, 10);
    const user = Object.assign(new User(), {
      firstname,
      lastname,
      username,
      password: hashedpwd,
      refreshToken: process.env.REFRESH_TOKEN_SECRET,
    });


    const savedUser = await this.userRepository.save(user);

    return response.status(201).json(savedUser);
  }

  async handleLogin(request: Request, response: Response, next: NextFunction) {
    const { username, password } = request.body;
    if (!username || !password) {
      return response
        .status(400)
        .json({ message: "Username and password are required" });
    }

    const user = await this.userRepository.findOne({
      where: { username },
    });

    if (!user) {
      return response.status(401).json({ message: "Unauthorized" });
    }

    const match = await bcrypt.compare(password, user.password);
    if (match) {
      // create JWTs
      //   return `User: ${user.username} is logged in`;
      response
        .status(200)
        .json({ message: `User: ${user.username} is logged in` });
    } else {
      return response.status(401).json({ message: "Unauthorized" });
    }
  }

  async remove(request: Request, response: Response, next: NextFunction) {
    const id = parseInt(request.params.id);

    const userToRemove = await this.userRepository.findOneBy({ id });

    if (!userToRemove) {
      throw Error(`User with _id:${id} not exist`);
    }
    await this.userRepository.remove(userToRemove);

    return response
      .status(200)
      .json({ message: `User with _id:${id} has been removed` });
  }
}
