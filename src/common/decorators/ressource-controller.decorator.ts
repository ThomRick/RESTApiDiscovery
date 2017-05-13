import 'reflect-metadata';
import {ResourceMetadata} from './metadata/resource.metadata';
import {KEY_METADATA, PATH_METADATA} from './metadata/constants';

export const ResourceController = (metadata: ResourceMetadata): ClassDecorator => {
  return (target: object) => {
    Reflect.defineMetadata(KEY_METADATA, metadata.key, target);
    Reflect.defineMetadata(PATH_METADATA, metadata.path, target);
  };
};
