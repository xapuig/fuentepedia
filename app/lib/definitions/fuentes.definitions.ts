export type FuenteField = {
  id: string;
  ubicacion_id: string;
  name: string;
  lat: number;
  lng: number;
  imgUrl: string;
};

export type StateFuente = {
  errors?: {
    ubicacionId?: string[];
    name?: string[];
    lat?: string[];
    lng?: string[];
    imgUrl?: string[];
  };
  message?: string | null;
};
