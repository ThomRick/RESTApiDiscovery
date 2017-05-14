import {UriTemplate} from '../../../common/interfaces/uri-template';

export interface ApiDiscoveryResponse {
  _links: { [key: string]: UriTemplate }
  _self: string
}