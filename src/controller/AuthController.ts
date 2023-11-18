import * as bcrypt from "bcrypt";
import { Request, Response } from "express";
import { connectDatabase } from "../config/connectDatabase";
import { User } from "../entity/user/User";

export class AuthController {
  private userRepository = connectDatabase.getRepository(User);

  async handleLogin(req: Request, res: Response) {
    const { username, password } = req.body;
    this.validUserData(res, username, password);

    const user = await this.userRepository.findOne({
      where: { username },
    });

    if (!user) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const match = await bcrypt.compare(password, user.password);
    if (match) {
      // create JWTs
      //   return `User: ${user.username} is logged in`;
      res.status(200).json({ message: `User: ${user.username} is logged in` });
    } else {
      return res.status(401).json({ message: "Unauthorized" });
    }
  }

  private validUserData(res: Response, username: string, password: string) {
    if (!username || !password) {
      return res
        .status(400)
        .json({ message: "Username and password are required" });
    }
  }
}
