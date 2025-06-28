import {User} from "../User";
import {UserInputModel} from "../userInputModel";
import {repository} from "../../core/repository/data-acsess-layer";
import bcrypt from 'bcrypt';
import {SALT_ROUNDS} from "../../authorization/createTokenForTests";
import {queryRepo} from "../../core/repository/data-acsess-present-layer";



export const usersService = {
    async createNewUser (dto: UserInputModel): Promise<string>{
        //получили хэш-пароль (пароль+соль)
        const passwordHash = await bcrypt.hash(dto.password,SALT_ROUNDS);
        const existingUserByLogin = await queryRepo.findUserByLogin(dto.login);
        if (existingUserByLogin) {
            return 'exist'
        }

        // Проверка на уникальность email
        const existingUserByEmail = await queryRepo.findUserByEmail(dto.email);
        if (existingUserByEmail) {
            return  'exist'
        }
        const newUser:User = {
            login: dto.login,
            email: dto.email,
            password: passwordHash,
            createdAt: new Date()
        }
        return await repository.createNewUser(newUser)
    },
    async removeUserById(id: string):Promise<void>{
        await repository.removeUser(id);
        return
    }
}