import {Router} from './router';
import {Application as ExpressApplication, Router as ExpressRouter} from 'express';
import * as express from 'express';
import * as supertest from 'supertest';

describe('Router', () => {
  let router: Router;
  let endpoint: string = '/api';

  beforeEach(() => {
    router = new Router(endpoint);
  });

  describe('#create()', () => {
    it('should expose GET /api endpoint', () => {
      const apiRouter: ExpressRouter = router.create([]);
      const application: ExpressApplication = express();
      application.use(apiRouter);

      supertest(application)
        .get(endpoint)
        .expect(200)
        .end((error, response) => {
          expect(response.body).toEqual({
            _links: {},
            _self: endpoint
          });
        });
    });
  });
});
