import { NextFunction, Request, Response } from "express";
import { ResponseObject } from '../util/ResponseObject';
import { StatusResponse } from '../enums/StatusResponse';
import jwt, { JwtPayload, TokenExpiredError } from 'jsonwebtoken';
import { getUser } from "../repositorys/user.repository";


export const validSession = async (req: Request, res: Response, next: NextFunction) => {
  const token = req.cookies.token
  if(!token) {
    return res.status(401).json(
      new ResponseObject( StatusResponse.FAIL, 'Sessão inválida.', null, null)
    )
  }

  try { 
    const { id } = jwt.verify(token, process.env.JWT_PASS ?? '') as JwtPayload;
    
    const user = await getUser({ id });

    if(!user) {
      return res.status(401).json(new ResponseObject(StatusResponse.FAIL, 'Usuário não existe.', null, null));
    }

    req.user = user;
    next();
  } catch(error) {
    if (error instanceof TokenExpiredError) {
      return res.status(401).json(new ResponseObject(StatusResponse.FAIL, 'Token expirado.', null, null));
    }
    return res.status(401).json(new ResponseObject(StatusResponse.ERROR, 'Token inválido', null, null));
  }
}