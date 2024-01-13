import { User } from "../../src/entity/user/User";
import { UserRole } from "../../src/enums/UserRole";
import {
  createMockUserDetails,
  createMockUserInvalidDetails,
} from "./UserDetailsMock";
export const createMockUser = (): User => {
  const userDetails = createMockUserDetails();

  return {
    id: 1,
    firstname: "Mxas",
    lastname: "Foteres",
    username: "Krzysiekksiazek34",
    password: "haslo123",
    refreshToken: "refreshToken123",
    createdAt: new Date(),
    updatedAt: new Date(),
    roles: [UserRole.USER],
    inventory: null,
    user_details: userDetails,
  };
};

export const createInvalidMockUser = (): User => {
  const invalidUserDetails = createMockUserInvalidDetails();
  return {
    id: 1,
    firstname: "Mxas",
    lastname: "Foteres",
    username: "Krzysiekksiazek34",
    password: "haslo123",
    refreshToken: "refreshToken123",
    createdAt: new Date(),
    updatedAt: new Date(),
    roles: [UserRole.USER],
    inventory: null,
    user_details: invalidUserDetails,
  };
};
