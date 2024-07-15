"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BillsController = void 0;
const bill_repository_1 = require("../repositorys/bill.repository");
const entrie_repository_1 = require("../repositorys/entrie.repository");
const ResponseObject_1 = require("../util/ResponseObject");
const StatusResponse_1 = require("../enums/StatusResponse");
class BillsController {
    async create(req, res) {
        try {
            const { title, type, ammount, dueDate, card, entriesQt, user } = req.body;
            const ammountToFloat = parseFloat(ammount);
            const entriesQtToFloat = parseFloat(entriesQt);
            const createdBill = await (0, bill_repository_1.createBill)({ title, type, ammount: ammountToFloat, dueDate: new Date(dueDate), idCard: card ? card.id : undefined, idUser: user.id });
            const listOfCreatedEntries = [];
            for (let i = 0; i < entriesQt; i++) {
                const dateDueDate = new Date(dueDate);
                const createdEntrie = await (0, entrie_repository_1.createEntrie)({ value: parseFloat((ammountToFloat / entriesQtToFloat).toFixed(2)), dueDate: new Date(dateDueDate.setMonth(dateDueDate.getMonth() + i)), idBill: createdBill.id, idUser: user.id });
                listOfCreatedEntries.push({ ...createdEntrie });
            }
            return res.status(201)
                .json(new ResponseObject_1.ResponseObject(StatusResponse_1.StatusResponse.SUCCESS, 'Conta criada com sucesso!', null, { entries: listOfCreatedEntries, bill: createdBill }));
        }
        catch (error) {
            console.log(error);
            return res.status(500).json(new ResponseObject_1.ResponseObject(StatusResponse_1.StatusResponse.ERROR, 'Ocorreu um erro ao comunicar-se com o servidor.', null, null));
        }
    }
}
exports.BillsController = BillsController;
