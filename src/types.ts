export interface NominatimResult {
  lat: string;
  lon: string;
  display_name: string;
}

export interface KomootTour {
  id: string;
  name: string;
  distance: number;
  duration: number;
  elevation_up: number;
  elevation_down: number;
  difficulty: {
    grade: string;
    explanation_fitness: string;
    explanation_technical: string;
  };
  sport: string;
  constitution: number;
  start_point: {
    lat: number;
    lng: number;
    alt: number;
  };
  status: string;
}

export interface KomootDiscoverResponse {
  _embedded: {
    items: KomootTour[];
  };
  page: {
    size: number;
    totalElements: number;
    totalPages: number;
    number: number;
  };
}
