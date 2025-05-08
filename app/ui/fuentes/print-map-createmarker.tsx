'use client';
import {
  useLoadScript,
  GoogleMap,
  MarkerF,
  InfoWindow,
} from '@react-google-maps/api';
import { useMemo, useState, useActionState, useEffect, useRef } from 'react';
import styles from '@/app/ui/home.module.css';
import { FuenteField } from '@/app/lib/definitions/fuentes.definitions';
import { UbicacionField } from '@/app/lib/definitions/ubicaciones.definitions';
import { createFuente } from '@/app/lib/actions/fuentes.actions';
import Link from 'next/link';
import { Button } from '@/app/ui/button';

export default function MapCreateMarker({
  ubicacion = [],
  ubicaciones = [],
  fuentes = [],
  latnuevo = ubicacion[0]?.lat || 40.41575,
  lngnuevo = ubicacion[0]?.lng || -3.67777,
}: {
  ubicacion?: UbicacionField[];
  ubicaciones?: UbicacionField[];
  fuentes?: FuenteField[];
  latnuevo?: number;
  lngnuevo?: number;
}) {
  const [activeMarker, setActiveMarker] = useState(null);
  const [Latitud, setLatitud] = useState<number>(Number(latnuevo));
  const [Longitud, setLongitud] = useState<number>(Number(lngnuevo));
  const [activeMarkerNuevo, setActiveMarkerNuevo] = useState(true);
  const initialState = { message: '', errors: {} };
  const [state, dispatch] = useActionState(createFuente, initialState);
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    function watchReset(e: Event) {
      e.preventDefault();
    }
    const form = formRef.current;
    form?.addEventListener('reset', watchReset);

    return () => {
      form?.removeEventListener('reset', watchReset);
    };
  }, []);

  const handleActiveMarker = (marker: any) => {
    if (marker === activeMarker) {
      return;
    }
    setActiveMarker(marker);
  };

  const handleClickOnMap = (e: any, activo: any) => {
    setActiveMarker(null);
    setActiveMarkerNuevo(false);
    if (activo === true)
      setLatitud(e.latLng.lat()),
        setLongitud(e.latLng.lng()),
        setActiveMarkerNuevo(true);
  };

  const handleUbicacionChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedId = e.target.value;
    const selectedUbicacion = ubicaciones.find(
      (ubicacion) => ubicacion.id === selectedId,
    );

    if (selectedUbicacion) {
      setLatitud(Number(selectedUbicacion.lat));
      setLongitud(Number(selectedUbicacion.lng));
      setActiveMarkerNuevo(false);
    }
  };

  const libraries = useMemo(() => ['places'], []);

  if (isNaN(Number(latnuevo)) || isNaN(Number(lngnuevo))) {
    latnuevo = ubicacion[0].lat;
    lngnuevo = ubicacion[0].lng;
  }
  const mapCenter = useMemo(
    () => ({ lat: Latitud, lng: Longitud }),
    [Latitud, Longitud],
  );
  const myStyles = useMemo(
    () => [
      {
        featureType: 'poi.business',
        elementType: 'labels',
        stylers: [{ visibility: 'off' }],
      },
      {
        featureType: 'transit',
        elementType: 'labels',
        stylers: [{ visibility: 'off' }],
      },
    ],
    [],
  );

  const mapOptions = useMemo<google.maps.MapOptions>(
    () => ({
      disableDefaultUI: false,
      clickableIcons: false,
      scrollwheel: true,
      styles: myStyles,
    }),
    [myStyles],
  );

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_KEY as string,
  });

  if (!isLoaded) {
    return <p>Loading...</p>;
  }

  return (
    <div className={styles.homeWrapper}>
      <form action={dispatch} ref={formRef}>
        <div className="rounded-md bg-gray-50 p-4 md:p-6">
          {/* Nombre */}
          <div className="mb-4">
            <label htmlFor="name" className="mb-2 block text-sm font-medium">
              Nombre
            </label>
            <div className="relative mt-2 rounded-md">
              <div className="relative">
                <input
                  id="name"
                  name="name"
                  type="text"
                  placeholder="Escribe el nombre de la fuente"
                  className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                  aria-describedby="name-error"
                />
              </div>
            </div>
            <div id="name-error" aria-live="polite" aria-atomic="true">
              {state.errors?.name &&
                state.errors.name.map((error: string) => (
                  <p className="mt-2 text-sm text-red-500" key={error}>
                    {error}
                  </p>
                ))}
            </div>
          </div>
          {/* Ubicación */}
          <div className="mb-4">
            <label
              htmlFor="ubicacionId"
              className="mb-2 block text-sm font-medium"
            >
              Ubicación
            </label>
            <div className="relative mt-2 rounded-md">
              <select
                onChange={handleUbicacionChange}
                id="ubicacionId"
                name="ubicacionId"
                className="peer mb-4 block w-full cursor-pointer rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2"
                aria-describedby="ubicacionId-error"
                defaultValue={ubicacion[0]?.id ?? ''}
              >
                <option disabled value="">
                  Selecciona una ubicación
                </option>
                {ubicaciones.map((ubicacion_select) => (
                  <option key={ubicacion_select.id} value={ubicacion_select.id}>
                    {ubicacion_select.name}
                  </option>
                ))}
              </select>
            </div>
            <div id="ubicacionId-error" aria-live="polite" aria-atomic="true">
              {state.errors?.ubicacionId &&
                state.errors.ubicacionId.map((error: string) => (
                  <p className="mt-2 text-sm text-red-500" key={error}>
                    {error}
                  </p>
                ))}
            </div>
          </div>

          {/* Latitud */}
          <div className="mb-4">
            <label htmlFor="lat" className="mb-2 block text-sm font-medium">
              Latitud
            </label>
            <div className="relative mt-2 rounded-md">
              <div className="relative">
                <input
                  id="lat"
                  name="lat"
                  type="number"
                  step="any"
                  required
                  placeholder="Escribe la latitud para el marcador de la fuente"
                  className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                  aria-describedby="lat-error"
                  onChange={(e) => setLatitud(e.target.valueAsNumber)}
                  value={Latitud || ''}
                />
              </div>
            </div>
            <div id="lat-error" aria-live="polite" aria-atomic="true">
              {state.errors?.lat &&
                state.errors.lat.map((error: string) => (
                  <p className="mt-2 text-sm text-red-500" key={error}>
                    {error}
                  </p>
                ))}
            </div>
          </div>
          {/* Longitud */}
          <div className="mb-4">
            <label htmlFor="lng" className="mb-2 block text-sm font-medium">
              Longitud
            </label>
            <div className="relative mt-2 rounded-md">
              <div className="relative">
                <input
                  id="lng"
                  name="lng"
                  type="number"
                  step="any"
                  required
                  placeholder="Escribe la longitud para el marcador de la fuente"
                  className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                  aria-describedby="lng-error"
                  onChange={(e) => setLongitud(e.target.valueAsNumber)}
                  value={Longitud || ''}
                />
              </div>
            </div>
            <div id="lng-error" aria-live="polite" aria-atomic="true">
              {state.errors?.lng &&
                state.errors.lng.map((error: string) => (
                  <p className="mt-2 text-sm text-red-500" key={error}>
                    {error}
                  </p>
                ))}
            </div>
          </div>
          {/* URL de la imagen */}
          <div className="mb-4">
            <label htmlFor="imgUrl" className="mb-2 block text-sm font-medium">
              URL de la imagen
            </label>
            <div className="relative mt-2 rounded-md">
              <div className="relative">
                <input
                  id="imgUrl"
                  name="imgUrl"
                  type="text"
                  placeholder="Escribe la URL de la imagen"
                  className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                  aria-describedby="imgUrl-error"
                />
              </div>
            </div>
            <div id="imgUrl-error" aria-live="polite" aria-atomic="true">
              {state.errors?.imgUrl &&
                state.errors.imgUrl.map((error: string) => (
                  <p className="mt-2 text-sm text-red-500" key={error}>
                    {error}
                  </p>
                ))}
            </div>
          </div>
        </div>
        <div className="mt-6 flex justify-end gap-4">
          {ubicacion.length > 0 ? (
            <Link
              href={`/dashboard/ubicaciones/${ubicacion[0].id}/mapa`}
              className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
            >
              Cancelar
            </Link>
          ) : (
            <Link
              href={'/dashboard/ubicaciones'}
              className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
            >
              Cancelar
            </Link>
          )}

          <Button type="submit">Crear fuente</Button>
        </div>
      </form>
      <GoogleMap
        options={mapOptions}
        zoom={17}
        center={mapCenter}
        mapTypeId={google.maps.MapTypeId.ROADMAP}
        mapContainerStyle={{ width: '75vw', height: '50vh' }}
        onLoad={(map) => console.log('Map Loaded')}
        onClick={(e) => handleClickOnMap(e, true)}
      >
        {activeMarkerNuevo === true ? (
          <MarkerF
            position={{ lat: Number(Latitud), lng: Number(Longitud) }}
          ></MarkerF>
        ) : (
          false
        )}
        {fuentes.map((fuente) => (
          <MarkerF
            key={fuente.id}
            position={{ lat: Number(fuente.lat), lng: Number(fuente.lng) }}
            onLoad={() => console.log('Marker Loaded')}
            icon={{
              url: '/fuente_resized.png',
              labelOrigin: new google.maps.Point(0, -15),
            }}
            label={{ text: fuente.name, color: 'blue' }}
            onClick={() => handleActiveMarker(fuente.id)}
          >
            {activeMarker === fuente.id ? (
              <InfoWindow onCloseClick={() => setActiveMarker(null)}>
                <div>
                  <h2 className="mb-3">{fuente.name}</h2>
                </div>
              </InfoWindow>
            ) : null}
          </MarkerF>
        ))}
      </GoogleMap>
    </div>
  );
}
