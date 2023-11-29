import * as bcrypt from "bcrypt";
import * as jwt from "jsonwebtoken";
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
      const roles = Object.values(user.roles).filter(Boolean);
      // create JWTs
      const accessToken = jwt.sign(
        {
          UserInfo: {
            username: user.username,
            roles: roles,
          },
        },

        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: "45s" }
      );

      const refreshToken = jwt.sign(
        { username: user.username },
        process.env.REFRESH_TOKEN_SECRET,
        { expiresIn: "1d" }
      );

      user.refreshToken = refreshToken;
      await this.userRepository.save(user);

      res.cookie("jwt", refreshToken, {
        httpOnly: true,
        maxAge: 24 * 60 * 60 * 1000,
        sameSite: "none",
        // secure: true,
      });
      res
        .status(200)
        .json({
          message: `User: ${user.username} is logged in`,
          accessToken,
          roles,
          firstname: user.firstname,
          id: user.id,
          userDetails: user.user_details,
        });
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
