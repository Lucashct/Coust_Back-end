import { Request, Response } from "express";
import { createBill } from "../repositorys/bill.repository";

export class BillsController {
	public async create(req: Request, res: Response) {
		try {
			const {
				title,
				type,
				ammount,
				dueDate,
				card,
        entriesQt
			} = req.body;

      const createdBill = await createBill({ title, type, ammount, dueDate: new Date(dueDate) });

      if(card) {
        
      }
		} catch(error) {

		}
	}
}