import {UriTemplateMapper} from './uri-template.mapper';
import {expect} from 'chai';

describe('UriTemplateMapper', () => {
  let mapper: UriTemplateMapper;

  beforeEach(() => {
    mapper = new UriTemplateMapper();
  });

  it('can be created', () => {
    expect(mapper).to.exist;
  });

  describe('#map()', () => {
    it('can call map()', () => {
      mapper.map('uri');
    });

    it('should return an UriTemplate not templated', () => {
      expect(mapper.map('/api/path')).to.be.deep.equal({
        url: '/api/path',
        templated: false
      });
    });

    it('should return an UriTemplate templated', () => {
      expect(mapper.map('/api/path/:path-param')).to.be.deep.equal({
        url: '/api/path/:path-param',
        templated: true
      });
    });
  });
});
