export interface Competition {
  id: number;
  name: string;
  area: Area;
  code?: null;
  emblemUrl?: null;
  plan: string;
  numberOfAvailableSeasons: number;
  lastUpdated: string;
}

export interface Area {
  id: number;
  name: string;
}
