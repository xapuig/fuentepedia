'use client';
import {
  useLoadScript,
  GoogleMap,
  MarkerF,
  InfoWindow,
} from '@react-google-maps/api';
import { useMemo, useState } from 'react';
import styles from '@/app/ui/home.module.css';
import { FuenteField, UbicacionField } from '@/app/lib/definitions';
import {
  CreateFuente,
  CreateFuenteInfoWindow,
  DeleteFuente,
  EditFuente,
} from '@/app/ui/ubicaciones/fuentes/buttons';
import { InfoFuente } from '@/app/ui/ubicaciones/fuentes/info-fuente';

export default function Map({
  ubicacion,
  fuentes,
}: {
  ubicacion: UbicacionField[];
  fuentes: FuenteField[];
}) {
  const [activeMarker, setActiveMarker] = useState(null);
  const [activeMarkerNuevo, setActiveMarkerNuevo] = useState(false);
  const [LatitudNuevo, setLatitud] = useState(0);
  const [LongitudNuevo, setLongitud] = useState(0);
  const [selectedFuente, setSelectedFuente] = useState<FuenteField | null>(
    null,
  );

  const handleActiveMarker = (marker: any, fuenteSeleccionada: FuenteField) => {
    setActiveMarker(marker);
    setSelectedFuente(fuenteSeleccionada);
  };

  const handleClickOnMap = (e: any, activo: any) => {
    setActiveMarker(null);
    setActiveMarkerNuevo(false);
    if (activo === true)
      setLatitud(e.latLng.lat()),
        setLongitud(e.latLng.lng()),
        setActiveMarkerNuevo(true);
  };

  const [lat, setLat] = useState(Number(ubicacion[0].lat));
  const [lng, setLng] = useState(Number(ubicacion[0].lng));

  const libraries = useMemo(() => ['places'], []);

  const mapCenter = useMemo(() => ({ lat: lat, lng: lng }), [lat, lng]);
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
      minZoom: 15,
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
        onClick={(e) => handleClickOnMap(e, true)}
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
      {selectedFuente && (
        <InfoFuente
          fuente={selectedFuente}
          onClose={() => setSelectedFuente(null)}
        />
      )}
    </div>
  );
}
