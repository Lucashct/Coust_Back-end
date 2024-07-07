"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ResponseObject = void 0;
class ResponseObject {
    constructor(status, message, list, item) {
        this.status = status;
        this.message = message;
        this.list = list;
        this.item = item;
    }
}
exports.ResponseObject = ResponseObject;
