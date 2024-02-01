'use client';
import {
  useLoadScript,
  GoogleMap,
  MarkerF,
} from '@react-google-maps/api';
import type { NextPage } from 'next';
import { useMemo, useState } from 'react';
import styles from '../../ui/home.module.css';

const Home: NextPage = () => {
  const [lat, setLat] = useState(38.821934);
  const [lng, setLng] = useState(-0.606589);

  const libraries = useMemo(() => ['places'], []);
  const mapCenter = useMemo(() => ({ lat: lat, lng: lng }), [lat, lng]);
  var myStyles = [
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
      disableDefaultUI: true,
      clickableIcons: true,
      scrollwheel: true,
      styles: myStyles,
      zoom: 15,
    }),
    []
  );

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_KEY as string,
    libraries: libraries as any,
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
        mapContainerStyle={{ width: '1200px', height: '900px' }}
        onLoad={(map) => console.log('Map Loaded')}
      >
        <MarkerF
          position={mapCenter}
          onLoad={() => console.log('Marker Loaded')}
        />

      </GoogleMap>
    </div>
  );
};

export default Home;