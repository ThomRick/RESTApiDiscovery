import 'reflect-metadata';
import {UriTemplate} from '../../../common/interfaces/uri-template';
import {KEY_METADATA, PATH_METADATA} from '../../common/decorators/metadata/constants';
import {isFunction} from 'util';

export class Scanner {
  private static api: { [key: string]: UriTemplate } = {};

  constructor() {}

  public scan(controllers: Array<object>): { [key: string]: UriTemplate } {
    controllers.forEach(controller => {
      const prototype = Object.getPrototypeOf(controller);
      Scanner.addControllerResourceToApi(prototype);
    });
    return Scanner.api;
  }

  private static addControllerResourceToApi(prototype): void {
    Object.getOwnPropertyNames(prototype)
      .filter(method => {
        const descriptor = Object.getOwnPropertyDescriptor(prototype, method);
        if (descriptor.set || descriptor.get) {
          return false;
        }
        return method !== 'constructor' && isFunction(prototype[method]);
      })
      .forEach(method => {
        Scanner.addMethodResourceToApi(prototype, method);
      });
  }

  private static addMethodResourceToApi(prototype, method) {
    const descriptor: PropertyDescriptor = Object.getOwnPropertyDescriptor(prototype, method);
    const key: string = Reflect.getMetadata(KEY_METADATA, descriptor.value);
    const url: string = Reflect.getMetadata(PATH_METADATA, descriptor.value);
    Scanner.api[key] = {url: url, templated: false};
  }
}
