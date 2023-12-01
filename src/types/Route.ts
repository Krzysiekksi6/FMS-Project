import { RequestHandler } from "express";

type Route = {
  method: string;
  route: string;
  description?: string,
  controller: any;
  action: string;
  validation: RequestHandler[];
  secure?: boolean;
  roles?: string[];
};

export default Route;
