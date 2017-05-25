import {UriTemplate} from '../../../common/interfaces/uri-template';

export class UriTemplateMapper {
  private TEMPLATE_REGEX = /:/g;

  public map(uri: string): UriTemplate {
    return {
      url: uri,
      templated: this.isTemplated(uri)
    };
  }

  private isTemplated(uri: string): boolean {
    return this.TEMPLATE_REGEX.test(uri);
  }
}
