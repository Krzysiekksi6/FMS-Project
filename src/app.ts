import * as express from "express";
import * as cookieParser from "cookie-parser";
import * as morgan from "morgan";
import { NextFunction, Request, Response } from "express";
import { validationResult } from "express-validator";
import { Routes } from "./routes/routes";
import handleError from "./middleware/handleError";
import { verifyJWT } from "./middleware/verifyJWT";

const app = express();
app.use(morgan("tiny"));
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));

Routes.forEach((route) => {
  const protectedRoute = route.secure ? [verifyJWT] : [];
  (app as any)[route.method](
    route.route,
    ...route.validation,
    ...protectedRoute,
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
app.use(handleError);

export default app;
