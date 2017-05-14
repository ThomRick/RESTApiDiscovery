import {UriTemplate} from '../common/interfaces/uri-template';
import {UriBuilder} from './core/builder/uri-builder';

interface ApiDiscoveryResponse {
  _links: { [key: string]: UriTemplate }
  _self: string
}
const response: ApiDiscoveryResponse = {
  _links: {
    users: {
      url: '/api/users',
      templated: false
    },
    userById: {
      url: '/api/users/:id',
      templated: true
    }
  },
  _self: '/api'
};

class Api {
  private templates: { [key: string]: UriTemplate };

  constructor(response: ApiDiscoveryResponse) {
    this.templates = response._links;
  }

  public use(key: string): UriBuilder {
    return new UriBuilder(this.templates[key]);
  }
}

