import {WithId} from "mongodb";
import {User} from "../../Users/User";
import {MeViewModel} from "../MeViewModel.model";

export function mapToUserViewModel(user:WithId<User>):MeViewModel {
    return {
        email: user.email,
        login: user.login,
        userId: user._id.toString()
    }
}