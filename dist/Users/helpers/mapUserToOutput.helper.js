"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mapUserToOutput = mapUserToOutput;
function mapUserToOutput(dto) {
    let user = {
        id: dto._id.toString(),
        login: dto.login,
        email: dto.email,
        createdAt: dto.createdAt
    };
    return user;
}
