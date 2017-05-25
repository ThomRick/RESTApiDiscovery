import {ApiDiscovery} from './api-discovery';
import {ApiDiscoveryResponse} from './interfaces/api-discovery-response';
import {UriBuilder} from './builder/uri-builder';
import {expect} from 'chai';

describe('ApiDiscovery', () => {
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

  let apiDiscovery: ApiDiscovery;

  beforeEach(() => {
    apiDiscovery = new ApiDiscovery(response);
  });

  describe('#resource()', () => {
    it('should return an UriBuilder', () => {
      expect(apiDiscovery.resource('users')).to.be.deep.equal(new UriBuilder({ url: '/api/users', templated: false }));
    });

    it('should throw an Error caused by unknown resource', () => {
      expect(() => {
        apiDiscovery.resource('unknown');
      }).to.throw(new Error('Unknown resource unknown').message);
    });
  });
});
