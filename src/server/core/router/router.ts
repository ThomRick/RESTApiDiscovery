import * as express from 'express';
import {Request, Response, Router as ExpressRouter} from 'express';
import {UriTemplate} from '../../../common/interfaces/uri-template';
import {Scanner} from '../scanner/scanner';

export class Router {
  private static api: { [key: string]: UriTemplate };
  private static endpoint: string;

  private router: ExpressRouter = express.Router();
  private scanner: Scanner = new Scanner();

  constructor(endpoint: string) {
    Router.endpoint = endpoint;
  }

  public create(resources: Array<object>): ExpressRouter {
    Router.api = this.scanner.scan(resources);
    this.router.get(Router.endpoint, Router.handle);
    return this.router;
  }

  private static handle(request: Request, response: Response) {
    response.json({ _links: Router.api, _self: Router.endpoint });
  }
}
