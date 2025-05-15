export type FuenteField = {
  id: string;
  name: string;
  id_ubicacion: string;
  name_ubicacion: string;
  lat: number;
  lng: number;
  imgUrl: string;
};

export type StateFuente = {
  errors?: {
    name?: string[];
    id_ubicacion?: string[];
    lat?: string[];
    lng?: string[];
    imgUrl?: string[];
  };
  message?: string | null;
};
