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
exports.blogsService = void 0;
const data_acsess_layer_1 = require("../../core/repository/data-acsess-layer");
exports.blogsService = {
    createNewBlog(dto) {
        return __awaiter(this, void 0, void 0, function* () {
            const newBlog = {
                name: dto.name,
                description: dto.description,
                websiteUrl: dto.websiteUrl,
                createdAt: new Date(),
                isMembership: false
            };
            return yield data_acsess_layer_1.repository.createNewBlog(newBlog);
        });
    },
    removeBlogById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            //const index = localDB.blogs.findIndex((v) => v.id === id);
            yield data_acsess_layer_1.repository.removeBlogById(id);
            return;
        });
    },
    updateBlog(id, newBlog) {
        return __awaiter(this, void 0, void 0, function* () {
            yield data_acsess_layer_1.repository.updateBlog(id, newBlog);
            return;
        });
    },
};
