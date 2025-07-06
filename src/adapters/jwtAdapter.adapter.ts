import {UserViewModel} from "../Users/UserViewModel";

export const SECRET_KEY = 'secret';

export const jwtAdapter = {
    async createToken(user: UserViewModel) {
        const data = {id:user.id};
        return jwt.verify(data);
    }
}