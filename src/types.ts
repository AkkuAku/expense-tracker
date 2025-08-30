export interface Location {
  lat: number;
  lon: number;
}

export interface Expense {
  id: string;
  amount: number;
  note: string;
  category: string;
  location?: Location;
  date: string;
}
