"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const baseclass_1 = __importDefault(require("./baseclass"));
/**
 * @Category Authentication
 * @description Username and password authentication
 */
class basic_authentication extends baseclass_1.default {
    username;
    password;
    constructor(username, password) {
        super();
        this.username = username;
        this.password = password;
    }
    toString() {
        // Buffer needs a polyfill to work in browser
        const buf = Buffer.from(`${this.username}:${this.password}`, 'utf-8');
        return `Basic ${buf.toString('base64')}`;
    }
    toAxios() {
        return {
            username: this.username,
            password: this.password
        };
    }
}
exports.default = basic_authentication;
