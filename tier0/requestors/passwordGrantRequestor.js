"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const basic_1 = __importDefault(require("../authentication/basic"));
const credentialedRequestor_1 = __importDefault(require("./credentialedRequestor"));
const tokenRequestor_1 = __importDefault(require("./tokenRequestor"));
/**
 * @Category Requestor
 */
class passwordGrantRequestor extends tokenRequestor_1.default {
    arguments;
    constructor(args) {
        super(args.userAgent, new credentialedRequestor_1.default(args.userAgent, new basic_1.default(args.client_id, args.client_secret)));
        this.arguments = args;
    }
    createUpdateAccessTokenForm() {
        if (this.refresh_token) {
            return super.createUpdateAccessTokenForm();
        }
        const password = this.arguments.two_factor_code ? `${this.arguments.password}:${this.arguments.two_factor_code}` : this.arguments.password;
        return {
            grant_type: "password" /* PASSWORD */,
            username: this.arguments.username,
            password: password
        };
    }
}
exports.default = passwordGrantRequestor;
