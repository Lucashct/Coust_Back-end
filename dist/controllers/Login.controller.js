"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ResponseObject_1 = require("../util/ResponseObject");
const StatusResponse_1 = require("../enums/StatusResponse");
const user_repository_1 = require("../repositorys/user.repository");
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
class LoginController {
    async validSession(req, res) {
        try {
            const user = req.user;
            res.status(200).json(new ResponseObject_1.ResponseObject(StatusResponse_1.StatusResponse.SUCCESS, 'Sessão recuperada com sucesso.', null, user));
        }
        catch (error) {
            throw error;
        }
    }
    async login(req, res) {
        var _a, _b;
        try {
            const { email, password } = req.body;
            const userRecovered = await (0, user_repository_1.getUserByEmail)(email);
            const isUserAuth = await bcrypt_1.default.compare(password, (_a = userRecovered === null || userRecovered === void 0 ? void 0 : userRecovered.password) !== null && _a !== void 0 ? _a : '');
            const userToReturn = { id: userRecovered === null || userRecovered === void 0 ? void 0 : userRecovered.id, name: userRecovered === null || userRecovered === void 0 ? void 0 : userRecovered.name, email };
            if (isUserAuth) {
                return res.status(200)
                    .cookie('token', jsonwebtoken_1.default.sign({ id: userRecovered === null || userRecovered === void 0 ? void 0 : userRecovered.id, email: userRecovered === null || userRecovered === void 0 ? void 0 : userRecovered.email }, (_b = process.env.JWT_PASS) !== null && _b !== void 0 ? _b : '', { expiresIn: '7d' }), {
                    httpOnly: true,
                    maxAge: 604800000,
                    secure: false
                })
                    .json(new ResponseObject_1.ResponseObject(StatusResponse_1.StatusResponse.SUCCESS, 'Login efetuado com sucesso', null, userToReturn));
            }
            else {
                return res.status(401)
                    .json(new ResponseObject_1.ResponseObject(StatusResponse_1.StatusResponse.FAIL, 'Usuário não econtrado', null, null));
            }
        }
        catch (error) {
            res.status(500);
            res.json(new ResponseObject_1.ResponseObject(StatusResponse_1.StatusResponse.ERROR, 'Erro ao fazer login', null, null));
            throw error;
        }
    }
    logOut(req, res) {
        try {
            return res.clearCookie('token').status(200).json(new ResponseObject_1.ResponseObject(StatusResponse_1.StatusResponse.SUCCESS, '', null, null));
        }
        catch (error) {
            return res.status(500).json(new ResponseObject_1.ResponseObject(StatusResponse_1.StatusResponse.ERROR, '', null, null));
        }
    }
}
exports.default = LoginController;
