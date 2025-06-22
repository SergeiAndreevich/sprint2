"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.usersService = void 0;
const data_acsess_layer_1 = require("../../core/repository/data-acsess-layer");
const bcrypt_1 = __importDefault(require("bcrypt"));
const createTokenForTests_1 = require("../../authorization/createTokenForTests");
exports.usersService = {
    createNewUser(dto) {
        return __awaiter(this, void 0, void 0, function* () {
            //получили хэш-пароль (пароль+соль)
            const passwordHash = yield bcrypt_1.default.hash(dto.password, createTokenForTests_1.SALT_ROUNDS);
            const newUser = {
                login: dto.login,
                email: dto.email,
                password: passwordHash,
                createdAt: new Date()
            };
            return yield data_acsess_layer_1.repository.createNewUser(newUser);
        });
    },
    removeUserById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            yield data_acsess_layer_1.repository.removeUser(id);
            return;
        });
    }
};
