import { connectDatabase } from "../config/connectDatabase";
import { NextFunction, Request, Response } from "express";
import { User } from "../entity/user/User";

export class UserController {
    private userRepository = connectDatabase.getRepository(User);

    async all(request: Request, response: Response, next: NextFunction) {
        return this.userRepository.find();
    }

    async one(request: Request, response: Response, next: NextFunction) {
        const id = parseInt(request.params.id);

        const user = await this.userRepository.findOne({
            where: { id },
        });

        if (!user) {
            throw Error("unregistered  user");
        }
        return user;
    }

    async save(request: Request, response: Response, next: NextFunction) {
        const { firstName, lastName, age } = request.body;

        const user = Object.assign(new User(), {
            firstName,
            lastName,
            age,
        });

        return this.userRepository.save(user);
    }

    async remove(request: Request, response: Response, next: NextFunction) {
        const id = parseInt(request.params.id);

        const userToRemove = await this.userRepository.findOneBy({ id });

        if (!userToRemove) {
            throw Error(`User with _id:${id} not exist`);
        }
        await this.userRepository.remove(userToRemove);

        return `User with _id:${id} has been removed`;
    }
}
