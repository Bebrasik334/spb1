// Map.js

import React, { useEffect, useRef } from "react";

export default function Map({ places }) {
  const mapRef = useRef(null);
  const mapInstance = useRef(null);

  useEffect(() => {
    if (!window.google || mapInstance.current) return;

    // ✅ ОБЯЗАТЕЛЬНО задаём center + zoom
    mapInstance.current = new window.google.maps.Map(mapRef.current, {
      center: { lat: 41.2995, lng: 69.2401 }, // старт (Ташкент пример)
      zoom: 12,
    });

    const bounds = new window.google.maps.LatLngBounds();

    places.forEach(place => {
      const position = {
        lat: place.lat,
        lng: place.lng,
      };

      // ✅ Marker
      const marker = new window.google.maps.Marker({
        position,
        map: mapInstance.current,
        title: place.name,
      });

      // ✅ Добавляем в bounds
      bounds.extend(position);

      // ✅ КЛИК → открыть ТОЧНО ЭТУ точку
      marker.addListener("click", () => {
        openMaps(place);
      });
    });

    // ✅ Авто подгон карты под все точки
    if (places.length > 0) {
      mapInstance.current.fitBounds(bounds);
    }
  }, [places]);

  return (
    <div
      ref={mapRef}
      style={{ width: "100%", height: "500px" }}
    />
  );
}


// ============================
// ✅ ОТКРЫТИЕ ТОЧКИ В КАРТАХ
// ============================

function openMaps(place) {
  const lat = place.lat;
  const lng = place.lng;
  const name = encodeURIComponent(place.name);

  const isIOS = /iPhone|iPad|iPod/i.test(navigator.userAgent);

  let url;

  if (isIOS) {
    // Apple Maps
    url = `https://maps.apple.com/?ll=${lat},${lng}&q=${name}`;
  } else {
    // Google Maps — ПО КООРДИНАТАМ
    url = `https://www.google.com/maps/search/?api=1&query=${lat},${lng}`;
  }

  window.open(url, "_blank");
}
