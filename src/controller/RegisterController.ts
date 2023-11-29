import * as bcrypt from "bcrypt";
import { getManager } from "typeorm";
import { Request, Response } from "express";
import { connectDatabase } from "../config/connectDatabase";
import { User } from "../entity/user/User";
import { Inventory } from "../entity/inventory/Inventory";
export class RegisterController {
  private userRepository = connectDatabase.getRepository(User);
  private inventoryRepository = connectDatabase.getRepository(Inventory);

  async handleNewUser(req: Request, res: Response) {
    const { firstname, lastname, username, password } = req.body;

    this.validUserData(res, firstname, lastname, username, password);
    this.checkDuplicateUser(res, username);
    const newInventory = Object.assign(new Inventory(), {
      items: []
    });

    const savedInventory = await this.inventoryRepository.save(newInventory);
    console.log("new", savedInventory)
    console.log("saved", savedInventory)

    const hashedpwd = await bcrypt.hash(password, 10);
    const user = Object.assign(new User(), {
      firstname,
      lastname,
      username,
      password: hashedpwd,
      refreshToken: process.env.REFRESH_TOKEN_SECRET,
      inventory: savedInventory,
    });

    const newUser = this.userRepository.create(user);

    const savedUser = await this.userRepository.save(newUser);

    return res.status(201).json(savedUser);
  }

  private validUserData(
    res: Response,
    firstname: string,
    lastname: string,
    username: string,
    password: string
  ) {
    if (!firstname || !lastname || !username || !password) {
      return res.status(400).json({
        message: "Firstname, Lastname, Username, and Password are required!",
      });
    }
  }
  private async checkDuplicateUser(res: Response, username: string) {
    const duplicate = await this.userRepository.findOne({
      where: { username },
    });

    if (duplicate) {
      return res.status(409).json({ message: "User already exist" });
    }
  }
}
