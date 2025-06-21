import {User} from "../User";
import {UserInputModel} from "../userInputModel";
import {repository} from "../../core/repository/data-acsess-layer";

export const usersService = {
    async createNewUser (dto: UserInputModel): Promise<string>{
        const newUser:User = {
            login: dto.login,
            email: dto.email,
            password: dto.password,
            createdAt: new Date()
        }
        return await repository.createNewUser(newUser)
    },
    async removeUserById(id: string):Promise<void>{
        await repository.removeUser(id);
        return
    }
}