import type { Dateish } from 'app/models';
import type { ID } from 'app/store/models/index';

export default interface Penalty {
  id: ID;
  createdAt: Dateish;
  user: ID;
  reason: string;
  weight: number;
  sourceEvent: ID;
  exactExpiration: Dateish;
}
