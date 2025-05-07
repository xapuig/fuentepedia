export type UbicacionField = {
  id: string;
  name: string;
  zipcode: string;
  lat: number;
  lng: number;
};

export type StateUbicacion = {
  errors?: {
    name?: string[];
    zipcode?: string[];
    lat?: string[];
    lng?: string[];
  };
  message?: string | null;
};
