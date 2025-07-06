import {UserViewModel} from "../Users/UserViewModel";
import {JwtPayload, sign, verify} from 'jsonwebtoken';

export const SECRET_KEY = 'secret';

export const jwtAdapter = {
    async createToken(user: UserViewModel) {
        const data = {id:user.id, role: 'user'};
        return sign(data,SECRET_KEY,{expiresIn: '1h'});
    },
    async verifyToken(token: string): Promise<JwtPayload | string | null> {
        try {
            return verify(token,SECRET_KEY);
        }
        catch (e){
            console.log('Failed to verify token', e);
            return null
        }
    }
}