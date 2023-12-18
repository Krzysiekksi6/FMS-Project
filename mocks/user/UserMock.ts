import { User, UserRole } from "../../src/entity/user/User";
import { createMockUserDetails, createMockUserInvalidDetails } from "./UserDetailsMock";
export const createMockUser = (): User => {
  const userDetails = createMockUserDetails(); 

  return {
    id: 1, 
    firstname: "Mx",
    lastname: "Foter",
    username: "Krzysiekksi6",
    password: "haslo123",
    refreshToken: "refreshToken123",
    createdAt: new Date(), 
    updatedAt: new Date(), 
    roles: [UserRole.USER],
    user_details: userDetails,
  };
};

export const createInvalidMockUser = (): User => {
  const invalidUserDetails = createMockUserInvalidDetails()
  return {
    id: 1, 
    firstname: "Mx",
    lastname: "Foter",
    username: "Krzysiekksi6",
    password: "haslo123",
    refreshToken: "refreshToken123",
    createdAt: new Date(), 
    updatedAt: new Date(), 
    role: UserRole.USER,
    user_details: invalidUserDetails,
  };
}
