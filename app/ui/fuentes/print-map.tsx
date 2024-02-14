'use client'
import {
    useLoadScript,
    GoogleMap,
    MarkerF,
    InfoWindow,
  } from '@react-google-maps/api';
  import { useMemo, useState } from 'react';
  import styles from '../../ui/home.module.css';
  import { FuenteField, UbicacionField } from '@/app/lib/definitions';
  import { DeleteFuente, EditFuente } from '@/app/ui/fuentes/buttons';


  export default function Map({ ubicacion, fuentes}: { ubicacion: UbicacionField[], fuentes: FuenteField[] }) {
    const [activeMarker, setActiveMarker] = useState(null);

    const handleActiveMarker = (marker: any) => {
      if (marker === activeMarker) {
        return;
      }
      setActiveMarker(marker);
    };

    const handleClickOnMap = () => {
      setActiveMarker(null);
    }

  const [lat, setLat] = useState(Number(ubicacion[0].lat));
  const [lng, setLng] = useState(Number(ubicacion[0].lng));

  const libraries = useMemo(() => ['places'], []);
  const mapCenter = useMemo(() => ({ lat: lat, lng: lng }), [lat, lng]);
  const myStyles = [
    {
        featureType: "poi",
        elementType: "labels",
        stylers: [
              { visibility: "off" }
        ]
    },
    {
      featureType: "transit",
        elementType: "labels",
        stylers: [
              { visibility: "off" }
        ]
    }
];

  const mapOptions = useMemo<google.maps.MapOptions>(
    () => ({
      disableDefaultUI: false,
      clickableIcons: true,
      scrollwheel: true,
      styles: myStyles,
      minZoom: 15,
    }),
    []
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
        zoom={14}
        center={mapCenter}
        mapTypeId={google.maps.MapTypeId.ROADMAP}
        mapContainerStyle={{ width: '50%', height: '50vh' }}
        onLoad={(map) => console.log('Map Loaded')}
        onClick={() => handleClickOnMap()}
      >
         {fuentes.map((fuente) => (
              <MarkerF 
              key={fuente.id} 
              position={{ lat: Number(fuente.lat), lng: Number(fuente.lng) }} 
              onLoad={() => console.log('Marker Loaded')}
              icon={{
                url: 'https://i.imgur.com/HY488rK.png',
              }}
              onClick={() => handleActiveMarker(fuente.id)}                
              >
                {activeMarker === fuente.id ? (
                  <InfoWindow onCloseClick={() => setActiveMarker(null)}>
                    <div>
                      <h2 className='mb-3'>{fuente.name}</h2>
                      <EditFuente id={fuente.id}/>
                      <DeleteFuente id={fuente.id}/>
                    </div>
                  </InfoWindow>
                ) : null}
              </MarkerF>
            ))}
      </GoogleMap>
    </div>
  );
  }