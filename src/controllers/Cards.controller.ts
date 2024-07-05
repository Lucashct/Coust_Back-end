import { Request, Response } from "express";
import { createCard, listCards, removeCard } from "../repositorys/card.repository";
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

      await createCard({ name, limit: parseFloat(limit), dueDate, idUser: user.id });
      
      const cardsList = await listCards(user);

      return res.status(201)
      .json(new ResponseObject(StatusResponse.SUCCESS, 'Cartão criado com sucesso!', cardsList, null));
    } catch(error) {
      console.log(error);
      return res.status(500)
      .json(new ResponseObject(StatusResponse.ERROR, 'Erro ao se comunicar com o servidor', null, null));
    }
  }

  public async remove(req: Request, res: Response) {
    try {
      const {
        id,
        user
      } = req.body;

      const card = await removeCard({ id });

      if(card) {
        const cardsList = await listCards(user);

        return res.status(200)
        .json(new ResponseObject(StatusResponse.SUCCESS, 'Cartao removido com sucesso!', cardsList, null))
      } else {
        return res.status(200)
        .json(new ResponseObject(StatusResponse.FAIL, 'Cartao nao localizado', null, null));
      }
    } catch(error) {
      console.log(error);

      return res.status(500)
      .json(new ResponseObject(StatusResponse.ERROR, 'Erro ao se comunicar com o servidor', null, null));
    }
  }
}