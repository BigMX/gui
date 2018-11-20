import { Item } from './item';
export class Account {
  firstName?: string;
  lastName?: string;
  email?: string;
  password?:string;
  phone?: number;
  id?: number;
  notifications?: string[];
  cart?: Item[];
}
