"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mapToUserViewModel = mapToUserViewModel;
function mapToUserViewModel(user) {
    return {
        email: user.email,
        login: user.login,
        userId: user._id.toString()
    };
}
