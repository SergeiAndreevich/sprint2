import {UserViewModel} from "../Users/UserViewModel";
import { sign, verify } from 'jsonwebtoken';

export const SECRET_KEY = 'secret';

export const jwtAdapter = {
    async createToken(user: UserViewModel) {
        const data = {id:user.id, role: 'user'};
        return sign(data,SECRET_KEY,{expiresIn: '1h'});
    }
}