export type FuenteField = {
  id: string;
  id_ubicacion: string;
  name: string;
  lat: number;
  lng: number;
  imgUrl: string;
};

export type StateFuente = {
  errors?: {
    id_ubicacion?: string[];
    name?: string[];
    lat?: string[];
    lng?: string[];
    imgUrl?: string[];
  };
  message?: string | null;
};
