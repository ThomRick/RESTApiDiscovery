import {UriTemplateMapper} from './uri-template.mapper';
import {expect} from 'chai';

describe('UriTemplateMapper', () => {
  it('can be created', () => {
    const mapper = new UriTemplateMapper();
    expect(mapper).to.exist;
  });

  it('can call build()', () => {
    const mapper = new UriTemplateMapper();
    expect(mapper.mapper).to.exist;
  });

  describe('#map()', () => {

  });
});
