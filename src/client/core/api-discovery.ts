import {UriBuilder} from './builder/uri-builder';
import {ApiDiscoveryResponse} from './interfaces/api-discovery-response';
import {UriTemplate} from '../../common/interfaces/uri-template';
import {isNullOrUndefined} from 'util';

export class ApiDiscovery {
  private templates: { [key: string]: UriTemplate };

  constructor(response: ApiDiscoveryResponse) {
    this.templates = response._links;
  }

  public resource(key: string): UriBuilder {
    const template: UriTemplate = this.templates[key];
    if (isNullOrUndefined(template)) {
      throw new Error(`Unknown resource ${ key }`);
    }
    return new UriBuilder(this.templates[key]);
  }
}
