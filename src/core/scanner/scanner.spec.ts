import {Scanner} from './scanner';
import {Resource} from '../resource/resource';
import {ResourceController} from '../../common/decorators/ressource-controller.decorator';

describe('Scanner', () => {
  let scanner: Scanner;

  beforeEach(() => {
    scanner = new Scanner();
  });

  describe('#scan()', () => {
    @ResourceController({key: 'users', path: '/users'})
    class UsersController {}

    it('should return a Map of Resource', () => {
      const resourceMap: { [key: string]: Resource } = scanner.scan([]);
    });

    it('should return the expected Resource Map', () => {
      const resourceMap: { [key: string]: Resource } = scanner.scan([UsersController]);
      expect(resourceMap).toEqual({
        users: {
          url: '/users',
          templated: false
        }
      });
    });
  });
});
