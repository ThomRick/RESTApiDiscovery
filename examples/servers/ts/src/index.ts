import * as express from 'express';
import {UserController} from './user.controller';

class ApplicationStarter {
  public static main(): void {
    const application: express.Application = express();
    application.use(ApplicationStarter.getRouter());
    //application.use(ApplicationStarter.getApiDiscoveryRouter());
    this.start(application);
  }

  private static getRouter(): express.Router {
    const router: express.Router = express.Router();
    const controller: UserController = new UserController();
    router.get('/api/users', controller.getAll.bind(controller));
    return router;
  }

  /*
  private static getApiDiscoveryRouter(): express.Router {
    return new Router('/api/map').create([
      UserController
    ]);
  }
  */

  private static start(application: express.Application): void {
    application.listen(8080, () => {
      console.log('Application server listening at port 8080');
    });
  }
}
ApplicationStarter.main();
