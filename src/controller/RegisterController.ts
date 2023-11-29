import * as bcrypt from "bcrypt";
import { Request, Response } from "express";
import { connectDatabase } from "../config/connectDatabase";
import { User } from "../entity/user/User";
import { Inventory } from "../entity/inventory/Inventory";

export class RegisterController {
  private userRepository = connectDatabase.getRepository(User);
  private userInventoryRepository = connectDatabase.getRepository(Inventory);

  async handleNewUser(req: Request, res: Response) {
    const { firstname, lastname, username, password } = req.body;

    this.validUserData(res, firstname, lastname, username, password);
    this.checkDuplicateUser(res, username);

    const hashedpwd = await bcrypt.hash(password, 10);
    const user = Object.assign(new User(), {
      firstname,
      lastname,
      username,
      password: hashedpwd,
      refreshToken: process.env.REFRESH_TOKEN_SECRET,
    });

    const savedUser = await this.userRepository.save(user);

    const inventory = Object.assign(new Inventory(), {
      user: savedUser,
      items: [],
    });

    await this.userInventoryRepository.save(inventory);

    return res
      .status(201)
      .json({ user: savedUser, inventory: savedUser.inventory });
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
