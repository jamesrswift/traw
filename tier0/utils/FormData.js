"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FormData = void 0;
const form_data_1 = __importDefault(require("form-data"));
const isBrowser_1 = __importDefault(require("./isBrowser"));
exports.FormData = isBrowser_1.default ? self.FormData : form_data_1.default;
exports.default = exports.FormData;
