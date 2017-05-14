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

const controller = new UsersController();
const router: ExpressRouter = express.Router();
router.get('/api/users', controller.getAll.bind(controller));
router.get('/api/users/:id', controller.getById.bind(controller));

const application: ExpressApplication = express();
application.use(router);

const resourceRouter: ExpressRouter = new Router('/api')
  .create([
    controller
  ]);

application.use(resourceRouter);

application.listen(8080, () => {
  console.log('application listening at port 8080');
});