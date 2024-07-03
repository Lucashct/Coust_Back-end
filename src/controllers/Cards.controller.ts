import { Request, Response } from "express";
import { createCard, listCards } from "../repositorys/card.repository";
import { ResponseObject } from "../util/ResponseObject";
import { StatusResponse } from "../enums/StatusResponse";

export class CardsController {
  public async create(req: Request, res: Response) {
    try {
      const {
        name,
        limit,
        dueDate,
        user
      } = req.body
      
      await createCard({ name, limit, dueDate, user });
      
      const cardsList = await listCards(user);

      return res.status(201)
      .json(new ResponseObject(StatusResponse.SUCCESS, 'Cartão criado com sucesso!', cardsList, null));
    } catch(error) {
      return res.status(500)
      .json(new ResponseObject(StatusResponse.ERROR, 'Erro ao se comunicar com o servidor', null, null));
    }
  }
}