import { Request, Response } from "express";
import { connectDatabase } from "../config/connectDatabase";
import { UserDetails } from "../entity/user/UserDetails";
import { User } from "../entity/user/User";
export class UserDetailsController {
  private userDetailsRepository = connectDatabase.getRepository(UserDetails);
  private userRepository = connectDatabase.getRepository(User);

  async removeUserDetails(request: Request, response: Response) {
    try {
      const userId = parseInt(request.params.id);
      const user = await this.findUserById(userId);
      if (!user) {
        return response.status(404).json({ message: "User not found" });
      }

      return response.status(200).json({
        message: `Details for user with id ${userId} have been removed`,
      });
    } catch (error) {
      return response.status(500).json({ error: error.message });
    }
  }

  async addUserDetails(request: Request, response: Response) {
    try {
      const userId = parseInt(request.params.id);
      const user = await this.findUserById(userId);

      if (!user) {
        return response.status(404).json({ message: "User not found" });
      }

      const userDetailsData = request.body;
      if (!this.isValidUserDetailsData(userDetailsData)) {
        return response.status(400).json({ message: "Invalid data" });
      }

      const bmi = this.calculateBMI(
        userDetailsData.weight,
        userDetailsData.height
      );

      const bmr = this.calculateBMR(
        userDetailsData.weight,
        userDetailsData.height,
        userDetailsData.age
      );
      const userDetails = this.createUserDetailsEntity(
        userDetailsData,
        bmi,
        bmr
      );

      user.user_details = userDetails;

      await this.saveUserDetails(userDetails);
      await this.saveUser(user);

      return response.status(201).json(userDetails);
    } catch (error) {
      return response.status(500).json({ error: error.message });
    }
  }

  private async findUserById(userId: number): Promise<User | undefined> {
    return await this.userRepository.findOne({ where: { id: userId } });
  }

  private isValidUserDetailsData(userDetailsData: any): boolean {
    const { age, weight, height } = userDetailsData;
    return age !== undefined && weight !== undefined && height !== undefined;
  }

  private createUserDetailsEntity(
    userDetailsData: any,
    bmi: number,
    bmr: number
  ): UserDetails {
    const userDetails = new UserDetails();
    Object.assign(userDetails, userDetailsData);
    userDetails.bmi = bmi;
    userDetails.bmr = bmr;
    return userDetails;
  }

  private async saveUserDetails(
    userDetails: UserDetails
  ): Promise<UserDetails> {
    return await this.userDetailsRepository.save(userDetails);
  }

  private async saveUser(user: User): Promise<User> {
    return await this.userRepository.save(user);
  }

  private heightInMeters(heightInCm: number): number {
    if (isNaN(heightInCm) || heightInCm <= 0) {
      throw new Error(
        "Invalid input. Height must be a positive non-zero number."
      );
    }
    return heightInCm / 100;
  }

  public calculateBMI(weight: number, height: number): number {
    if (isNaN(weight) || isNaN(height) || weight < 0 || height <= 0) {
      throw new Error(
        "Invalid input. Weight must be a positive number, and height must be a positive non-zero number."
      );
    }

    const convertedHeight = this.heightInMeters(height);

    const bmi = weight / (convertedHeight * convertedHeight);
    return Number(bmi.toFixed(2));
  }

  public calculateBMR(weight: number, height: number, age: number): number {
    if (
      isNaN(weight) ||
      isNaN(height) ||
      isNaN(age) ||
      weight <= 0 ||
      height <= 0 ||
      age <= 0
    ) {
      throw new Error(
        "Invalid input. Weight, height, age must be a positive non-zero number."
      );
    }

    const bmr = 10 * weight + 6.25 * height - 5 * age + 5;

    return bmr;
  }
}
