import {NextFunction} from "express";

export const SUPERADMIN_LOGIN = process.env.SUPERADMIN_LOGIN ||'superadmin';
export const SUPERADMIN_EMAIL = process.env.SUPERADMIN_EMAIL || 'superadmin@mail.ru';
export const SUPERADMIN_PASSWORD = process.env.SUPERADMIN_PASSWORD || '1234';

export const superAdminAuthorizeMiddleware = (req: Request, res: Response, next: NextFunction) => {



    next()
}