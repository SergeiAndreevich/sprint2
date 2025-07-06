import {LoginInputModel} from "./LoginInputModel";
import {Result, ResultStatus} from "../core/core-types/ResultObject.model";
import {UserViewModel} from "../Users/UserViewModel";
import {repository} from "../core/repository/data-acsess-layer";
import {jwtAdapter} from "../adapters/jwtAdapter.adapter";

export const authService = {
    async authUser(dto: LoginInputModel): Promise<Result<UserViewModel | null>> {
        const {loginOrEmail, password} = dto;
        const user = await this._checkUserCredentials(loginOrEmail, password);
        if(user.status !== ResultStatus.Success){
            return user
        }
        const acsessToken = await jwtAdapter.createToken();
        return {
            status: ResultStatus.Success, data:
        }
    },
    async _checkUserCredentials(loginOrEmail: string, password: string):Promise<Result<UserViewModel | null>> {
        const user = await repository.findUserByLoginOrEmail(loginOrEmail, password);
        return {status: user.status, data: user.data};
    }
}