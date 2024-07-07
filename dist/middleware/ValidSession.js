"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validSession = void 0;
const ResponseObject_1 = require("../util/ResponseObject");
const StatusResponse_1 = require("../enums/StatusResponse");
const jsonwebtoken_1 = __importStar(require("jsonwebtoken"));
const user_repository_1 = require("../repositorys/user.repository");
const validSession = async (req, res, next) => {
    var _a;
    const token = req.cookies.token;
    if (!token) {
        return res.status(401).json(new ResponseObject_1.ResponseObject(StatusResponse_1.StatusResponse.FAIL, 'Sessão inválida.', null, null));
    }
    try {
        const { id } = jsonwebtoken_1.default.verify(token, (_a = process.env.JWT_PASS) !== null && _a !== void 0 ? _a : '');
        const user = await (0, user_repository_1.getUser)({ id });
        if (!user) {
            return res.status(401).json(new ResponseObject_1.ResponseObject(StatusResponse_1.StatusResponse.FAIL, 'Usuário não existe.', null, null));
        }
        req.user = user;
        next();
    }
    catch (error) {
        if (error instanceof jsonwebtoken_1.TokenExpiredError) {
            return res.status(401).json(new ResponseObject_1.ResponseObject(StatusResponse_1.StatusResponse.FAIL, 'Token expirado.', null, null));
        }
        return res.status(401).json(new ResponseObject_1.ResponseObject(StatusResponse_1.StatusResponse.ERROR, 'Token inválido', null, null));
    }
};
exports.validSession = validSession;
