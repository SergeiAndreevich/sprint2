import {ADMIN_PASSWORD, ADMIN_USERNAME} from "./middlewares/authorization.middleware";
export const SALT_ROUNDS = 10;

export const createAuthorizationToken = () =>{
    const token = `${ADMIN_USERNAME}:${ADMIN_PASSWORD}`;
    const basedToken = Buffer.from(token).toString('base64');
    return `Basic ${basedToken}`
}
