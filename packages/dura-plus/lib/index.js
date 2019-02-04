"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __importDefault(require("@dura/core"));
var async_1 = require("@dura/async");
var async_loading_1 = require("@dura/async-loading");
var immer_1 = require("@dura/immer");
var selectors_1 = require("@dura/selectors");
exports.create = function (initialRootModel, config) {
    return core_1.default.create(__assign({ initialModel: initialRootModel, plugins: [async_1.createAsyncPlugin(), async_loading_1.createLoadingPlugin(initialRootModel), immer_1.createImmerPlugin(), selectors_1.createSelectorsPlugin()] }, config));
};
//# sourceMappingURL=index.js.map