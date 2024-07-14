import { Request, Response } from "express";
import { createBill } from "../repositorys/bill.repository";
import { createEntrie } from "../repositorys/entrie.repository";
import { ResponseObject } from "../util/ResponseObject";
import { StatusResponse } from "../enums/StatusResponse";

export class BillsController {
	public async create(req: Request, res: Response) {
		try {
			const {
				title,
				type,
				ammount,
				dueDate,
				card,
        entriesQt,
				user
			} = req.body;
			const ammountToFloat = parseFloat(ammount);
			const entriesQtToFloat = parseFloat(entriesQt);

      const createdBill = await createBill({ title, type, ammount: ammountToFloat, dueDate: new Date(dueDate), idCard: card ? card.id : undefined, idUser: user.id });

			const listOfCreatedEntries = [];
			
      for(let i = 0; i < entriesQt; i++) {
				const dateDueDate = new Date(dueDate);

				const createdEntrie = await createEntrie({ value: parseFloat((ammountToFloat / entriesQtToFloat).toFixed(2)), dueDate: new Date(dateDueDate.setMonth(dateDueDate.getMonth() + i)), idBill: createdBill.id, idUser: user.id });

				listOfCreatedEntries.push({ ...createdEntrie });
			}
      
			return res.status(201)
			.json(new ResponseObject( StatusResponse.SUCCESS, 'Conta criada com sucesso!', null, 
				{ entries: listOfCreatedEntries, bill: createdBill  }
			))
		} catch(error) {
			console.log(error);

			return res.status(500).json(new ResponseObject(StatusResponse.ERROR, 'Ocorreu um erro ao comunicar-se com o servidor.', null, null))
		}
	}
}