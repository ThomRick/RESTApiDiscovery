import {UriTemplate} from '../../../common/interfaces/uri-template';

export class UriBuilder {
  private template: UriTemplate;

  constructor(template: UriTemplate) {
    this.template = template;
  }

  public param(key: string, value: string): UriBuilder {
    this.template.url = this.template.url.replace(`:${ key }`, value);
    return this;
  }

  public query(key: string, value: string): UriBuilder {
    if (/[?]/.test(this.template.url)) {
      this.template.url = this.template.url.concat(`&${ key }=${ value }`);
    } else {
      this.template.url = this.template.url.concat(`?${ key }=${ value }`);
    }
    return this;
  }

  public build(): string {
    return this.template.url;
  }
}
