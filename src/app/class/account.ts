import { Item } from './item';
export class Account {
  firstName?: string;
  lastName?: string;
  email?: string;
  password?:string;
  phone?: number;
  user_id?: number;
  notifications?: string[];
  cart?: Item[];
}
