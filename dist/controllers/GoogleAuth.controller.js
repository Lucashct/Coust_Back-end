"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const google_auth_library_1 = require("google-auth-library");
const user_repository_1 = require("../repositorys/user.repository");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const ResponseObject_1 = require("../util/ResponseObject");
const StatusResponse_1 = require("../enums/StatusResponse");
class GoogleAuthController {
    async verifyToken(req, res) {
        var _a, _b;
        try {
            const { code } = req.body;
            const client = new google_auth_library_1.OAuth2Client(process.env.GOOGLE_CLIENT_ID, process.env.GOOGLE_SECRET_KEY, process.env.GOOGLE_REDIRECT_URL);
            const result = await client.getToken(code);
            const ticket = await client.verifyIdToken({
                idToken: result.tokens.id_token,
                audience: process.env.GOOGLE_CLIENT_ID
            });
            const userPayload = ticket.getPayload();
            const user = await (0, user_repository_1.getUserByEmail)(userPayload === null || userPayload === void 0 ? void 0 : userPayload.email);
            if (!user) {
                const userCreated = await (0, user_repository_1.createUser)({ name: userPayload === null || userPayload === void 0 ? void 0 : userPayload.name, email: userPayload === null || userPayload === void 0 ? void 0 : userPayload.email });
                const userToSendResponse = await (0, user_repository_1.getUser)(userCreated);
                res.status(201);
                res.cookie('token', jsonwebtoken_1.default.sign({ id: userCreated.id, email: userCreated.email }, (_a = process.env.JWT_PASS) !== null && _a !== void 0 ? _a : '', { expiresIn: '7d' }), {
                    httpOnly: true,
                    maxAge: 604800000,
                    secure: true,
                    sameSite: 'none'
                });
                res.json(new ResponseObject_1.ResponseObject(StatusResponse_1.StatusResponse.SUCCESS, 'Usuário criado com sucesso.', null, userToSendResponse));
            }
            else {
                if (user.email == (userPayload === null || userPayload === void 0 ? void 0 : userPayload.email)) {
                    const userRecovered = await (0, user_repository_1.getUser)(user);
                    res.status(200);
                    res.cookie('token', jsonwebtoken_1.default.sign({ id: userRecovered === null || userRecovered === void 0 ? void 0 : userRecovered.id, email: userRecovered === null || userRecovered === void 0 ? void 0 : userRecovered.email }, (_b = process.env.JWT_PASS) !== null && _b !== void 0 ? _b : '', { expiresIn: '7d' }), {
                        httpOnly: true,
                        maxAge: 604800000,
                        secure: true,
                        sameSite: 'none'
                    });
                    res.json(new ResponseObject_1.ResponseObject(StatusResponse_1.StatusResponse.SUCCESS, 'Login realizado com sucesso.', null, userRecovered));
                }
                else {
                    res.status(401)
                        .json(new ResponseObject_1.ResponseObject(StatusResponse_1.StatusResponse.FAIL, 'Falha ao realizar login.', null, null));
                }
            }
        }
        catch (error) {
            throw error;
        }
    }
}
exports.default = GoogleAuthController;
