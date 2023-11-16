import { NextFunction, Request, Response } from "express";
import { connectDatabase } from "../config/connectDatabase";
import { UserDetails } from "../entity/user/UserDetails";
import { User } from "../entity/user/User";
export class UserDetailsController {
  private userDetailsRepository = connectDatabase.getRepository(UserDetails);
  private userRepository = connectDatabase.getRepository(User);

  private calculateBMI(weight: number, height: number): number {
    const heightInMeters = height / 100; // Zamiana wzrostu na metry
    const bmi = weight / (heightInMeters * heightInMeters);
    console.log(bmi);
    return bmi;
  }

  async addUserDetails(
    request: Request,
    response: Response,
    next: NextFunction
  ) {
    const userId = parseInt(request.params.id); // Załóżmy, że masz dostęp do id użytkownika z parametrów ścieżki

    try {
      const user = await this.userRepository.findOne({
        where: {
          id: userId,
        },
      });

      if (!user) {
        return response.status(404).json({ message: "User not found" });
      }

      const userDetailsData = request.body;
      const bmi = this.calculateBMI(
        userDetailsData.weight,
        userDetailsData.height
      );

      const userDetails = Object.assign(new UserDetails(), userDetailsData);

      // Przypisz szczegóły użytkownika do użytkownika
      user.user_details = userDetails;
      user.user_details.bmi = bmi;

      await this.userDetailsRepository.save(userDetails);
      await this.userRepository.save(user);

      return response.status(201).json(userDetails);
    } catch (error) {
      return response.status(500).json({ error: error.message });
    }
  }
}
