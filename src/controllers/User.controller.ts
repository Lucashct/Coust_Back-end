import { Request, Response } from "express";
import { createUser } from "../repositorys/user.repository";
import jwt from 'jsonwebtoken';
import { ResponseObject } from "../util/ResponseObject";
import { StatusResponse } from "../enums/StatusResponse";
import bcrypt from 'bcrypt';

export default class UserController {
  public async createUser(req: Request, res: Response) {
    try {
      const {
        name,
        email,
        password
      } = req.body

      const hashPassword = await bcrypt.hash(password, 10);

      const userCreated = await createUser({ name, email, password: hashPassword });

      const { password: _, ...loggedUser } = userCreated;

      res.status(201)
      res.cookie('token', jwt.sign({ id: userCreated.id, email: userCreated.email }, process.env.JWT_PASS ?? '', { expiresIn: '7d' }), {
        httpOnly: true,
        maxAge: 604800000,
        secure: false,
      });
      res.json(new ResponseObject(StatusResponse.SUCCESS, 'Usuário criado com sucesso', null, loggedUser));
    } catch(error) {
      res.status(500)
      .json(new ResponseObject(StatusResponse.ERROR, 'Erro ao criar usuário', null, null));
    }
  }
}