import users from "./api/users";
import register from "./api/register";
import auth from "./api/auth";
export const Routes = [
    ...users,
    ...register,
    ...auth
];