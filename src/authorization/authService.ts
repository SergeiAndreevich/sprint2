import {LoginInputModel} from "./LoginInputModel";
import {acsessToken, Result, ResultStatus} from "../core/core-types/ResultObject.model";
import {UserViewModel} from "../Users/UserViewModel";
import {repository} from "../core/repository/data-acsess-layer";
import {jwtAdapter} from "../adapters/jwtAdapter.adapter";

export const authService = {
    async authUser(dto: LoginInputModel): Promise<Result<acsessToken | null>> {
        const {loginOrEmail, password} = dto;
        const user = await this._checkUserCredentials(loginOrEmail, password);
        if(user.status !== ResultStatus.Success){
            return {
                status: user.status, data: null, error: {field: user.error!.field, message: user.error!.message}
            }
        }
        const acsessToken = await jwtAdapter.createToken(user.data!);
        return {
            status: ResultStatus.Success, data:acsessToken
        }
    },
    async _checkUserCredentials(loginOrEmail: string, password: string):Promise<Result<UserViewModel | null>> {
        const user = await repository.findUserByLoginOrEmail(loginOrEmail, password);
        return {status: user.status, data: user.data, error: user.error};
    }
}