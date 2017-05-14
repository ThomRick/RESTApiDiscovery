import * as express from 'express';
import {Application as ExpressApplication, Request, Response, Router as ExpressRouter} from 'express';
import {Router} from './core/router/router';
import {Resource} from './common/decorators/resource.decorator';

class UsersService {
  private users = [
    { id: '1', name: 'User1' },
    { id: '2', name: 'User2' },
    { id: '3', name: 'User3' }
  ];

  constructor() {}

  public getAll() {
    return this.users;
  }

  public getById(id) {
    return this.users.find(user => user.id === id);
  }
}

class UsersController {
  private service: UsersService;

  constructor() {
    this.service = new UsersService();
  }

  @Resource({key: 'users', path: '/api/users'})
  public getAll(request: Request, response: Response) {
    response.json(this.service.getAll());
  }

  @Resource({key: 'userById', path: '/api/users/:id'})
  public getById(request: Request, response: Response) {
    const id = request.params.id;
    response.json(this.service.getById(id));
  }
}

class UsersRouter {
  private router: ExpressRouter = express.Router();
  private controller: UsersController;

  constructor(controller: UsersController) {
    this.controller = controller;
  }

  public create(): ExpressRouter {
    this.router.get('/api/users', this.controller.getAll.bind(this.controller));
    this.router.get('/api/users/:id', this.controller.getById.bind(this.controller));
    return this.router;
  }
}

class ApplicationServer {
  private application: ExpressApplication = express();

  public create(): ApplicationServer {
    const controller = new UsersController();
    this.application.use(new UsersRouter(controller).create());
    this.application.use(new Router('/api').create([ controller ]));
    return this;
  }

  public start() {
    this.application.listen(8080, () => {
      console.log('application listening at port 8080');
    });
  }
}

new ApplicationServer()
  .create()
  .start();
