import {UriBuilder} from './uri-builder';

describe('UriBuilder', () => {
  describe('#param', () => {
    it('should return the UriBuilder with the replaced param', () => {
      const builder = new UriBuilder({ url: 'url/:param', templated: true });
      expect(builder.param('param', 'value'))
        .toEqual(new UriBuilder({ url: 'url/value', templated: true }));
    });
  });

  describe('#query()', () => {
    it('should add a query string to the url', () => {
      const builder = new UriBuilder({ url: 'url/:param', templated: true });
      expect(builder.query('param1', 'value1'))
        .toEqual(new UriBuilder({ url: 'url/:param?param1=value1', templated: true }));
    });

    it('should update the query string if it already exists', () => {
      const builder = new UriBuilder({ url: 'url/:param?param1=value1', templated: true });
      expect(builder.query('param2', 'value2'))
        .toEqual(new UriBuilder({ url: 'url/:param?param1=value1&param2=value2', templated: true }));
    });
  });

  describe('#build()', () => {
    it('should return the url', () => {
      const builder = new UriBuilder({ url: 'url/:param', templated: true });
      expect(builder.build()).toEqual('url/:param');
    });
  });
});
