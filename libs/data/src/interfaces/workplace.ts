export interface WorkPlace {
  placeNumber: number;
  availability: boolean;
  bookedDates: Record<string, any>;
  companyId: string;
  officeId: string;
  name?: string;
}
