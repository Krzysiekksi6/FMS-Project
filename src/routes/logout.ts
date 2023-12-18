import Route from "../types/Route";
import { LogoutController } from "../controller/LogoutController";

const logout: Route[] = [
  {
    method: "get",
    route: "/logout",
    controller: LogoutController,
    validation: [],
    action: "handleLogout",
  },
];

export default logout;
