import 'reflect-metadata';
import {ResourceMetadata} from './metadata/resource.metadata';
import {KEY_METADATA, PATH_METADATA} from './metadata/constants';

export const Resource = (metadata: ResourceMetadata): MethodDecorator => {
  return (target: string, key: string, descriptor: PropertyDescriptor) => {
    Reflect.defineMetadata(KEY_METADATA, metadata.key, descriptor.value);
    Reflect.defineMetadata(PATH_METADATA, metadata.path, descriptor.value);
    return descriptor;
  };
};
