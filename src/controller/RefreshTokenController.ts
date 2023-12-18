import * as jwt from "jsonwebtoken";
import { Request, Response } from "express";
import { connectDatabase } from "../config/connectDatabase";
import { User } from "../entity/user/User";

interface AuthRequest extends Request {
  username?: string;
}

export class RefreshTokenController {
  private userRepository = connectDatabase.getRepository(User);

  async handleRefreshToken(req: AuthRequest, res: Response) {
    const cookies = req.cookies;
    if (!cookies?.jwt) {
      return res.sendStatus(401);
    }

    const refreshToken = cookies.jwt;
    const user = await this.userRepository.findOne({
      where: { refreshToken },
    });
    if (!user) {
      return res.sendStatus(403);
    }
    // evaluate jwt
    jwt.verify(
      refreshToken,
      process.env.REFRESH_TOKEN_SECRET,
      (err, decoded) => {
        if (err || user.username !== decoded.username) {
          return res.sendStatus(403);
        }
        const roles = Object.values(user.roles);
        const accessToken = jwt.sign(
          {
            UserInfo: {
              username: decoded.username,
              roles: roles,
            },
          },
          process.env.ACCESS_TOKEN_SECRET,
          { expiresIn: "45s" }
        );
        res.json({ accessToken });
      }
    );
  }
}
