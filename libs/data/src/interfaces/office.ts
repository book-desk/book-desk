import { WorkPlace } from './workplace';

export interface Office {
  name: string;
  number: string;
  companyId: string;
  admin: string;
  logo?: Buffer;
  workplaces: Array<WorkPlace>;
  city?: string;
  address?: string;
}
