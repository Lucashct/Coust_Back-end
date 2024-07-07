"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const user_repository_1 = require("../repositorys/user.repository");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const ResponseObject_1 = require("../util/ResponseObject");
const StatusResponse_1 = require("../enums/StatusResponse");
const bcrypt_1 = __importDefault(require("bcrypt"));
class UserController {
    async createUser(req, res) {
        var _a;
        try {
            const { name, email, password } = req.body;
            const hashPassword = await bcrypt_1.default.hash(password, 10);
            const userCreated = await (0, user_repository_1.createUser)({ name, email, password: hashPassword });
            const { password: _, ...loggedUser } = userCreated;
            res.status(201);
            res.cookie('token', jsonwebtoken_1.default.sign({ id: userCreated.id, email: userCreated.email }, (_a = process.env.JWT_PASS) !== null && _a !== void 0 ? _a : '', { expiresIn: '7d' }), {
                httpOnly: true,
                maxAge: 604800000,
                secure: false,
            });
            res.json(new ResponseObject_1.ResponseObject(StatusResponse_1.StatusResponse.SUCCESS, 'Usuário criado com sucesso', null, loggedUser));
        }
        catch (error) {
            res.status(500)
                .json(new ResponseObject_1.ResponseObject(StatusResponse_1.StatusResponse.ERROR, 'Erro ao criar usuário', null, null));
        }
    }
}
exports.default = UserController;
