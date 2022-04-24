"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.formatLivethreadPermissions = exports.formatModPermissions = exports.formatPermissions = exports.handleJsonErrors = exports.addFullnamePrefix = exports.hasFullnamePrefix = void 0;
const lodash_1 = __importDefault(require("lodash"));
const constants_1 = require("../../tier0/constants");
function hasFullnamePrefix(item) {
    return /^(t\d|LiveUpdateEvent)_/.test(item);
}
exports.hasFullnamePrefix = hasFullnamePrefix;
function addFullnamePrefix(item, prefix) {
    if (typeof item === "string") {
        return hasFullnamePrefix(item) ? item : prefix + item;
    }
    return item.name;
}
exports.addFullnamePrefix = addFullnamePrefix;
function handleJsonErrors(response) {
    if (!lodash_1.default.isEmpty(response) && !lodash_1.default.isEmpty(response.data.json.errors)) {
        throw new Error(response.data.json.errors[0]);
    }
}
exports.handleJsonErrors = handleJsonErrors;
/**
* @summary Formats permissions into a '+'/'-' string
* @param {String[]} allPermissionNames All possible permissions in this category
* @param {String[]} permsArray The permissions that should be enabled
* @returns {String} The permissions formatted into a '+'/'-' string
* @api private
*/
function formatPermissions(allPermissionNames, permsArray) {
    if (permsArray == undefined)
        return '+all';
    return allPermissionNames.map(type => (permsArray.includes(type) ? '+' : '-') + type).join(',');
}
exports.formatPermissions = formatPermissions;
function formatModPermissions(permsArray) { return formatPermissions(constants_1.MODERATOR_PERMISSIONS, permsArray); }
exports.formatModPermissions = formatModPermissions;
function formatLivethreadPermissions(permsArray) { return formatPermissions(constants_1.LIVETHREAD_PERMISSIONS, permsArray); }
exports.formatLivethreadPermissions = formatLivethreadPermissions;
