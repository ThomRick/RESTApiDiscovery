import {Scanner} from './scanner';
import {UriTemplate} from '../../../common/interfaces/uri-template';
import {Resource} from '../../common/decorators/resource.decorator';

describe('Scanner', () => {
  let scanner: Scanner;

  beforeEach(() => {
    scanner = new Scanner();
  });

  describe('#scan()', () => {
    class UsersController {
      @Resource({key: 'users', path: '/users'})
      public getAll() {}
    }
    const controller = new UsersController();

    it('should return the expected Resource Map', () => {
      const resourceMap: { [key: string]: UriTemplate } = scanner.scan([controller]);
      expect(resourceMap).toEqual({
        users: {
          url: '/users',
          templated: false
        }
      });
    });
  });
});
