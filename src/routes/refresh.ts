import Route from "../types/Route";
import { RefreshTokenController } from "../controller/RefreshTokenController";

const refresh: Route[] = [
  {
    method: "get",
    route: "/refresh",
    controller: RefreshTokenController,
    validation: [],
    action: "handleRefreshToken",
  },
];

export default refresh;
