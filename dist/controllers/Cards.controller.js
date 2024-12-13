"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CardsController = void 0;
const card_repository_1 = require("../repositorys/card.repository");
const ResponseObject_1 = require("../util/ResponseObject");
const StatusResponse_1 = require("../enums/StatusResponse");
class CardsController {
    async create(req, res) {
        try {
            const { name, limit, dueDate, user } = req.body;
            await (0, card_repository_1.createCard)({ name, limit: parseFloat(limit), dueDate, idUser: user.id });
            const cardsList = await (0, card_repository_1.listCards)(user);
            return res.status(201)
                .json(new ResponseObject_1.ResponseObject(StatusResponse_1.StatusResponse.SUCCESS, 'Cartão criado com sucesso!', cardsList, null));
        }
        catch (error) {
            console.log(error);
            return res.status(500)
                .json(new ResponseObject_1.ResponseObject(StatusResponse_1.StatusResponse.ERROR, 'Erro ao se comunicar com o servidor', null, null));
        }
    }
    async remove(req, res) {
        try {
            const { id, user } = req.body;
            const card = await (0, card_repository_1.removeCard)({ id });
            if (card) {
                const cardsList = await (0, card_repository_1.listCards)(user);
                return res.status(200)
                    .json(new ResponseObject_1.ResponseObject(StatusResponse_1.StatusResponse.SUCCESS, 'Cartao removido com sucesso!', cardsList, null));
            }
            else {
                return res.status(200)
                    .json(new ResponseObject_1.ResponseObject(StatusResponse_1.StatusResponse.FAIL, 'Cartao nao localizado', null, null));
            }
        }
        catch (error) {
            console.log(error);
            return res.status(500)
                .json(new ResponseObject_1.ResponseObject(StatusResponse_1.StatusResponse.ERROR, 'Erro ao se comunicar com o servidor', null, null));
        }
    }
}
exports.CardsController = CardsController;
