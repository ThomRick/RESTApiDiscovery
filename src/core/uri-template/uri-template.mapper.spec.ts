import {UriTemplateMapper} from './uri-template.mapper';

describe('UriTemplateMapper', () => {
  it('can be created', () => {
    const mapper = new UriTemplateMapper();
    expect(mapper).toBeDefined();
  });

  it('can call build()', () => {
    const mapper = new UriTemplateMapper();
    expect(mapper.mapper).toBeDefined();
  });

  describe('#map()', () => {

  });
});
