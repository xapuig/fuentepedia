export type ComentarioField = {
  id: string;
  id_fuente: string;
  id_usuario: string;
  texto: string;
  fecha_creacion: string;
  nombre_usuario: string;
  nombre_fuente: string;
};

export type StateComentario = {
  errors?: {
    id_fuente?: string[];
    id_usuario?: string[];
    texto?: string[];
  };
  message?: string | null;
};
