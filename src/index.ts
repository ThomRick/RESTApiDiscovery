import {ResourceController} from './common/decorators/ressource-controller.decorator';
import {Application as ExpressApplication, Request, Response, Router as ExpressRouter} from 'express';
import * as express from 'express';
import {Router} from './core/router/router';

@ResourceController({key: 'users', path: '/api/users'})
class UsersController {
  public static getAll(request: Request, response: Response) {
    response.json({
      users: [
        { id: '1', name: 'User1' },
        { id: '2', name: 'User2' },
        { id: '3', name: 'User3' }
      ]
    });
  }
}

const resourceRouter: ExpressRouter = new Router('/api')
  .create([
    UsersController
  ]);

const router: ExpressRouter = express.Router();
router.get('/api/users', UsersController.getAll);

const application: ExpressApplication = express();
application.use(router);
application.use(resourceRouter);

application.listen(8080, () => {
  console.log('application listening at port 8080');
});