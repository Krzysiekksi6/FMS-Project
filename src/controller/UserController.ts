import * as bcrypt from "bcrypt";
import { NextFunction, Request, Response } from "express";
import { connectDatabase } from "../config/connectDatabase";
import { User } from "../entity/user/User";

export class UserController {
  private userRepository = connectDatabase.getRepository(User);

  async all(request: Request, response: Response, next: NextFunction) {
    const users = await this.userRepository.find({
      relations: {
        inventory: {
          items: true,
        },
        user_details: true,
      },
    });
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
      relations: {
        inventory: {
          items: true,
        },
        user_details: {
          currentDiet: true,
        },
      },
    });

    if (!user) {
      return response.status(404).json({ message: "User not found" });
    }
    response.json(user);
  }

  async editOne(req: Request, res: Response) {
    const id = parseInt(req.params.id);
    try {
      const userToUpdate = await this.userRepository.findOne({
        where: { id },
      });

      if (!userToUpdate) {
        return res.status(404).json({ message: "User not found" });
      }

      if (req.body.firstname) {
        userToUpdate.firstname = req.body.firstname;
      }

      if (req.body.lastname) {
        userToUpdate.lastname = req.body.lastname;
      }

      if (req.body.username) {
        userToUpdate.username = req.body.username;
      }

      await this.userRepository.save(userToUpdate);

      res.json(userToUpdate);
    } catch (error) {
      console.error("An error occurred:", error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  }

  async remove(request: Request, response: Response, next: NextFunction) {
    const id = parseInt(request.params.id);

    const userToRemove = await this.userRepository.findOneBy({ id });

    if (!userToRemove) {
      return response
        .status(404)
        .json({ message: `User with _id:${id} not exist` });
    }
    await this.userRepository.remove(userToRemove);

    return response
      .status(200)
      .json({ message: `User with _id:${id} has been removed` });
  }
}
