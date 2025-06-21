import {UserViewModel} from "../UserViewModel";
import {WithId} from "mongodb";
import {User} from "../User";

export function mapUserToOutput(dto:WithId<User>):UserViewModel{
    let user:UserViewModel = {
        id: dto._id.toString(),
        login: dto.login,
        email: dto.email,
        createdAt: dto.createdAt
    }

    return user
}