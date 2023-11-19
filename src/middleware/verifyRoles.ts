import { Request, Response, NextFunction } from "express";

interface VerivyRoleRequest extends Request {
  roles?: string[];
}

const verifyRoles = (...allowedRoles) => {
  return (req: VerivyRoleRequest, res: Response, next: NextFunction) => {
    if (!req?.roles) {
      return res.sendStatus(401);
    }
    const rolesArray = [...allowedRoles];
    console.log(rolesArray);
    console.log(req.roles);
    const result = req.roles
      .map((role) => rolesArray.includes(role))
      .find((val) => val === true);

    if (!result) {
      return res.sendStatus(401);
    }
    next();
  };
};


