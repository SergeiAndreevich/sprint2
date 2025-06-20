import {ADMIN_PASSWORD, ADMIN_USERNAME} from "./authorization.middleware";

export const createAuthorizationToken = () =>{
    const token = `${ADMIN_USERNAME}:${ADMIN_PASSWORD}`;
    const basedToken = Buffer.from(token).toString('base64');
    return `Basic ${basedToken}`
}