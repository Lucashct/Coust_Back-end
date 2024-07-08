import { Request, Response } from 'express';
import { OAuth2Client } from 'google-auth-library';
import { createUser, getUserByEmail, getUser } from '../repositorys/user.repository';
import jwt from 'jsonwebtoken';
import { ResponseObject } from '../util/ResponseObject';
import { StatusResponse } from '../enums/StatusResponse';

export default class GoogleAuthController {
  public async verifyToken(req: Request, res: Response) {
    try {
      const { code } = req.body;

      const client = new OAuth2Client(
        process.env.GOOGLE_CLIENT_ID,
        process.env.GOOGLE_SECRET_KEY,
        process.env.GOOGLE_REDIRECT_URL
      );
      
      const result = await client.getToken(code);

      const ticket = await client.verifyIdToken({
        idToken: result.tokens.id_token!,
        audience: process.env.GOOGLE_CLIENT_ID
      });

      const userPayload = ticket.getPayload();

      const user = await getUserByEmail(userPayload?.email);

      if(!user) {
        const userCreated = await createUser({ name: userPayload?.name, email: userPayload?.email });

        res.status(201)
        res.cookie('token', jwt.sign({ id: userCreated.id, email: userCreated.email }, process.env.JWT_PASS ?? '', { expiresIn: '7d' }), {
          httpOnly: true,
          maxAge:  604800000,
          secure: true,
          sameSite: 'none'
        })
        res.json(new ResponseObject(StatusResponse.SUCCESS, 'Usuário criado com sucesso.', null, userCreated));
      } else {
        if(user.email == userPayload?.email) {
          const userRecovered = await getUser(user);

          res.status(200)
          res.cookie('token', jwt.sign({ id: userRecovered?.id, email: userRecovered?.email }, process.env.JWT_PASS ?? '', { expiresIn: '7d' }),{
            httpOnly: true,
            maxAge:  604800000,
            secure: true,
            sameSite: 'none'
          })
          res.json(new ResponseObject(StatusResponse.SUCCESS, 'Login realizado com sucesso.', null, userRecovered));
        } else {
          res.status(401)
          .json(new ResponseObject(StatusResponse.FAIL, 'Falha ao realizar login.', null, null));
        }
      }

    }catch (error) {
      throw error;
    }
  }
}