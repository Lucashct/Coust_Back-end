import { Router } from "express";
import GoogleAuthController from "./controllers/GoogleAuth.controller";
import { validSession } from "./middleware/ValidSession";
import LoginController from "./controllers/Login.controller";
import UserController from "./controllers/User.controller";
import { CardsController } from "./controllers/Cards.controller";
import { BillsController } from "./controllers/Bills.controller";

const routes = Router();

routes.post('/verify/code', new GoogleAuthController().verifyToken);
routes.post('/login', new LoginController().login);
routes.post('/user/create', new UserController().createUser);

routes.use(validSession);

routes.post('/', new LoginController().validSession);
routes.get('/logout', new LoginController().logOut);

routes.post('/cards/create', new CardsController().create);
routes.post('/cards/remove', new CardsController().remove);

routes.post('/bills/create', new BillsController().create);

export default routes;