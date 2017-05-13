import 'reflect-metadata';
import {Resource} from './resource.decorator';
import {ResourceMetadata} from './metadata/resource.metadata';
import {KEY_METADATA, PATH_METADATA} from './metadata/constants';

describe('@Resource', () => {
  const properties: ResourceMetadata = {
    key: 'key',
    path: 'path'
  };

  it('should enhance class with expected request metadata', () => {
    class Test {
      @Resource(properties)
      public static test() {}
    }

    const key = Reflect.getMetadata(KEY_METADATA, Test.test);
    const path = Reflect.getMetadata(PATH_METADATA, Test.test);

    expect(key).toEqual(properties.key);
    expect(path).toEqual(properties.path);
  });
});
