"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.bearer_authentication = exports.basic_authentication = void 0;
var basic_1 = require("./basic");
Object.defineProperty(exports, "basic_authentication", { enumerable: true, get: function () { return __importDefault(basic_1).default; } });
var bearer_1 = require("./bearer");
Object.defineProperty(exports, "bearer_authentication", { enumerable: true, get: function () { return __importDefault(bearer_1).default; } });
