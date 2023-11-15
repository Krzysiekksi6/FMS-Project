import { User, UserRole } from "../../src/entity/user/User";
import { UserDetails } from "../../src/entity/user/UserDetails";
import { createMockUserDetails } from "./UserDetailsMock";
export const createMockUser = (): User => {
  const userDetails = createMockUserDetails(); // funkcja, która tworzy instancję UserDetails

  return {
    id: 1, // Możesz zmienić to na dynamiczne przypisanie ID w zależności od logiki aplikacji
    firstname: "Mx",
    lastname: "Foter",
    username: "Krzysiekksi6",
    password: "haslo123",
    refreshToken: "refreshToken123",
    createdAt: new Date(), // Możesz dostosować datę utworzenia w zależności od potrzeb testu
    updatedAt: new Date(), // Możesz dostosować datę aktualizacji w zależności od potrzeb testu
    role: UserRole.USER,
    user_details: userDetails,
  };
};
