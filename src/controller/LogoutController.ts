import { Request, Response, CookieOptions } from "express";
import { connectDatabase } from "../config/connectDatabase";
import { User } from "../entity/user/User";
const clearCookieConfig: CookieOptions = {
  httpOnly: true,
  secure: true, //- only in production and https
  sameSite: "none",
  maxAge: 24 * 60 * 60 * 1000,
};
export class LogoutController {
  private userRepository = connectDatabase.getRepository(User);

  async handleLogout(req: Request, res: Response) {
    // On client, also delete the accessToken

    const cookies = req.cookies;
    if (!cookies?.jwt) {
      return res.sendStatus(204);
    }

    const refreshToken = cookies.jwt;
    const user = await this.userRepository.findOne({
      where: { refreshToken },
    });

    if (!user) {
      res.clearCookie("jwt", {
        httpOnly: true,
        secure: true,
        sameSite: "none",
      });
      return res.sendStatus(204);
    }

    user.refreshToken = "";

    await this.userRepository.save(user);
    res.clearCookie("jwt", {
      httpOnly: true,
      secure: true,
      sameSite: "none",
    });
    res.sendStatus(204);
  }
}
