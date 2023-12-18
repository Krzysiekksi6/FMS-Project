import * as express from "express";
import { NextFunction, Request, Response } from "express";
import * as cookieParser from "cookie-parser";
import * as morgan from "morgan";
import * as cors from "cors";
import { validationResult } from "express-validator";
import { Routes } from "./routes/routes";
import handleError from "./middleware/handleError";
import { verifyJWT } from "./middleware/verifyJWT";
import { verifyRoles } from "./middleware/verifyRoles";
import { credentials } from "./middleware/credentials";
import { corsOptions } from "./config/corsOptions";
import swaggerDocs from "./utils/swagger";
import config from "./config";

const app = express();
app.use(morgan("tiny"));
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));
app.use(credentials);
app.use(cors(corsOptions));

Routes.forEach((route) => {
  const protectedRoute = route.secure ? [verifyJWT] : [];
  const userRolesPermissions =
    route.secure && route.roles ? [verifyRoles(...route.roles)] : [];
  (app as any)[route.method](
    route.route,
    ...route.validation,
    ...protectedRoute,
    ...userRolesPermissions,
    async (req: Request, res: Response, next: NextFunction) => {
      try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
          return res.status(400).json({ errors: errors.array() });
        }
        const result = await new (route.controller as any)()[route.action](
          req,
          res,
          next
        );
        res.json(result);
      } catch (error) {
        next(error);
      }
    }
  );
});
swaggerDocs(app, config.port)
app.use(handleError);

export default app;
