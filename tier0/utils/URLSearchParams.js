"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.URLSearchParams = void 0;
const url_1 = __importDefault(require("url"));
const isBrowser_1 = __importDefault(require("./isBrowser"));
exports.URLSearchParams = isBrowser_1.default ? self.URLSearchParams : url_1.default.URLSearchParams;
exports.default = exports.URLSearchParams;
