"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const baseclass_1 = __importDefault(require("./baseclass"));
/**
 * @Category Authentication
 * @description Bearer authentication
 */
class bearer_authentication extends baseclass_1.default {
    bearer;
    constructor(bearer) {
        super();
        this.bearer = bearer;
    }
    toString() {
        return `Bearer ${this.bearer}`;
    }
}
exports.default = bearer_authentication;
