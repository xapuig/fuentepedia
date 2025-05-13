'use client';
import {
  useLoadScript,
  GoogleMap,
  MarkerF,
  InfoWindow,
} from '@react-google-maps/api';
import { useMemo, useState } from 'react';
import styles from '@/app/ui/home.module.css';
import { FuenteField } from '@/app/lib/definitions/fuentes.definitions';
import { UbicacionField } from '@/app/lib/definitions/ubicaciones.definitions';
import { CreateFuenteInfoWindow } from '@/app/ui/fuentes/buttons';
import { FuenteInfo } from '@/app/ui/fuentes/fuente-info';
import { useRouter } from 'next/navigation';
import { set } from 'zod';

export default function Map({
  ubicacion,
  fuentes,
  AdminOrEditor,
  id_user,
  lat,
  lng,
}: {
  ubicacion: UbicacionField[];
  fuentes: FuenteField[];
  AdminOrEditor: boolean;
  id_user?: string | undefined;
  lat?: number;
  lng?: number;
}) {
  const defaultLat = +(lat ?? ubicacion[0].lat);
  const defaultLng = +(lng ?? ubicacion[0].lng);

  const router = useRouter();
  const [activeMarker, setActiveMarker] = useState(null);
  const [activeMarkerNuevo, setActiveMarkerNuevo] = useState(false);
  const [LatitudNuevo, setLatitudNuevo] = useState(0);
  const [LongitudNuevo, setLongitudNuevo] = useState(0);

  const handleActiveMarker = (marker: any, fuenteSeleccionada: FuenteField) => {
    router.push(`/dashboard/fuentes/${fuenteSeleccionada.id}`);
  };

  const handleClickOnMap = (e: any, activo: any) => {
    setActiveMarker(null);
    setActiveMarkerNuevo(false);
    if (activo === true) {
      setLatitudNuevo(e.latLng.lat());
      setLongitudNuevo(e.latLng.lng());
      setActiveMarkerNuevo(true);
    }
  };

  const libraries = useMemo(() => ['places'], []);

  const mapCenter = useMemo(
    () => ({ lat: defaultLat, lng: defaultLng }),
    [defaultLat, defaultLng],
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
      <GoogleMap
        options={mapOptions}
        zoom={17}
        center={mapCenter}
        mapTypeId={google.maps.MapTypeId.ROADMAP}
        mapContainerStyle={{ width: '75vw', height: '70vh' }}
        onLoad={(map) => console.log('Map Loaded')}
        onClick={AdminOrEditor ? (e) => handleClickOnMap(e, true) : undefined}
      >
        {activeMarkerNuevo === true ? (
          <MarkerF position={{ lat: LatitudNuevo, lng: LongitudNuevo }}>
            <InfoWindow onCloseClick={() => setActiveMarkerNuevo(false)}>
              <div>
                <CreateFuenteInfoWindow
                  id={ubicacion[0].id}
                  lat={LatitudNuevo}
                  lng={LongitudNuevo}
                />
              </div>
            </InfoWindow>
          </MarkerF>
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
              labelOrigin: new google.maps.Point(15, -15),
            }}
            label={{ text: fuente.name, color: 'blue' }}
            onClick={() => handleActiveMarker(fuente.id, fuente)}
          ></MarkerF>
        ))}
      </GoogleMap>
    </div>
  );
}
