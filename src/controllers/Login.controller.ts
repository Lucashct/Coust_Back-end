import { Request, Response } from 'express'
import { ResponseObject } from '../util/ResponseObject';
import { StatusResponse } from '../enums/StatusResponse';
import { getUserByEmail } from '../repositorys/user.repository';
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken';

export default class LoginController {
  public async validSession(req: Request, res: Response) {
    try {
      const user = req.user;
      res.status(200).json(new ResponseObject(StatusResponse.SUCCESS, 'Sessão recuperada com sucesso.', null, user));
    } catch(error) {
      throw error;
    }
  }

  public async login(req: Request, res: Response) {
    try {
      const {
        email,
        password
      } = req.body;

      const userRecovered = await getUserByEmail(email);
      const isUserAuth = await bcrypt.compare(password, userRecovered?.password ?? '');

      const userToReturn = { id: userRecovered?.id ,name: userRecovered?.name, email }

      if(isUserAuth) {
        return res.status(200)
        .cookie('token', jwt.sign({ id: userRecovered?.id, email: userRecovered?.email }, process.env.JWT_PASS ?? '', { expiresIn: '7d' }), {
          httpOnly: true,
          maxAge: 604800000,
          secure: true,
          sameSite: 'none'
        })
        .json(new ResponseObject(StatusResponse.SUCCESS, 'Login efetuado com sucesso', null, userToReturn));
      } else {
        return res.status(401)
        .json(new ResponseObject(StatusResponse.FAIL, 'Usuário não econtrado', null, null));
      }
    } catch(error) {
      res.status(500)
      res.json(new ResponseObject(StatusResponse.ERROR, 'Erro ao fazer login', null, null));
      throw error;
    }
  }

  public logOut(req: Request, res: Response) {
    try {
      return res.clearCookie('token').status(200).json(new ResponseObject(StatusResponse.SUCCESS, '', null, null));
    } catch(error) {
      return res.status(500).json(new ResponseObject(StatusResponse.ERROR, '', null, null));
    }
  }
}