import {ResourceController} from './ressource-controller.decorator';
import {ResourceMetadata} from './metadata/resource.metadata';
import {KEY_METADATA, PATH_METADATA} from './metadata/constants';

describe('@ResourceController', () => {
  const properties: ResourceMetadata = {
    key: 'key',
    path: 'path'
  };

  it('can be used', () => {
    expect(ResourceController).toBeDefined();
  });

  it('should enhance class with expected metadata', () => {
    @ResourceController(properties)
    class TestController {
      public static test() {}
    }

    const key = Reflect.getMetadata(KEY_METADATA, TestController);
    const path = Reflect.getMetadata(PATH_METADATA, TestController);

    expect(key).toEqual(properties.key);
    expect(path).toEqual(properties.path);
  });
});
