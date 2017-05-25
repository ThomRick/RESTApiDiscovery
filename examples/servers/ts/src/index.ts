import * as express from 'express';
import {Application, Router} from 'express';
import {UserController} from './user.controller';

class ApplicationStarter {
  public static main(): void {
    const application: Application = express();
    application.use(ApplicationStarter.getRouter());
    //application.use(ApplicationStarter.getApiDiscoveryRouter());
    this.start(application);
  }

  private static getRouter(): Router {
    const router: Router = express.Router();
    const controller: UserController = new UserController();
    router.get('/api/users', controller.getAll.bind(controller));
    return router;
  }

  private static getApiDiscoveryRouter(): Router {
    return null;
  }

  private static start(application: Application): void {
    application.listen(8080, () => {
      console.log('Application server listening at port 8080');
    });
  }
}
ApplicationStarter.main();
