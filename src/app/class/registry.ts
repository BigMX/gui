import {Item} from './item';
import { Viewer } from './viewers';

export class Registry {
  items?: Item[];
  name?: string;
  description?: string;
  user_id?: number;
  status?: string;
  registry_id?: number;
  viewers?: Viewer[];
}
