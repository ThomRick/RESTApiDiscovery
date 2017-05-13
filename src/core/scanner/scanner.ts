import 'reflect-metadata';
import {Resource} from '../resource/resource';
import {KEY_METADATA, PATH_METADATA} from '../../common/decorators/metadata/constants';

export class Scanner {
  private api: { [key: string]: Resource } = {};

  constructor() {}

  public scan(resources: Array<object>): { [key: string]: Resource } {
    for (const resource of resources) {
      this.addResourceToApi(resource);
    }
    return this.api;
  }

  private addResourceToApi(resource: object): void {
    const key: string = Reflect.getMetadata(KEY_METADATA, resource);
    const url: string = Reflect.getMetadata(PATH_METADATA, resource);
    this.api[key] = { url: url, templated: false };
  }
}
