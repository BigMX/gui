import { Item } from './item';

export class InvitedRegistry {
  id: number;
  userId: number;
  userEmail: string;
  boughtItems: Item[];
}
