import register from "./register";
import auth from "./auth";
import refresh from "./refresh";
import users from "./api/users";
import logout from "./logout";
export const Routes = [...register, ...auth, ...refresh, ...logout, ...users];
