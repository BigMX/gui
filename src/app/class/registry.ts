import {Item} from './item';
import { Viewer } from './viewers';

export class Registry {
  items?: Item[];
  name?: string;
  description?: string;
  userId?: number;
  status?: string;
  id?: number;
  viewers?: Viewer[];
}
