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
Object.defineProperty(exports, "__esModule", { value: true });
exports.jwtAdapter = exports.SECRET_KEY = void 0;
const jsonwebtoken_1 = require("jsonwebtoken");
exports.SECRET_KEY = 'secret';
exports.jwtAdapter = {
    createToken(user) {
        return __awaiter(this, void 0, void 0, function* () {
            const data = { id: user.id, role: 'user' };
            return (0, jsonwebtoken_1.sign)(data, exports.SECRET_KEY, { expiresIn: '1h' });
        });
    },
    verifyToken(token) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return (0, jsonwebtoken_1.verify)(token, exports.SECRET_KEY);
            }
            catch (e) {
                console.log('Failed to verify token', e);
                return null;
            }
        });
    }
};
