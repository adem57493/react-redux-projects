function toRad(value) {
  return (value * Math.PI) / 180;
}

function calculateDistance(lat1, lng1, lat2, lng2) {
  const R = 6371;
  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lng2 - lng1);
  const l1 = toRad(lat1);
  const l2 = toRad(lat2);

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.sin(dLon / 2) * Math.sin(dLon / 2) * Math.cos(l1) * Math.cos(l2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const d = R * c;
  return d;
}
/**
 * 
 *calculateDistance fonksiyonuna dört parametre (lat1, lng1, lat2, lng2) vermemizin nedeni,
 lat1 ve lng1: İlk konumun enlem ve boylam değerleri (başlangıç noktası).
lat2 ve lng2: İkinci konumun enlem ve boylam değerleri (hedef nokta).
 */
/**a.lat ve a.lon şeklindeki ifade, a nesnesinin içinde bulunan lat ve lon adlı özelliklere erişim için kullanılır. */
/**
 * 
 *const places = [
  { name: "Place 1", lat: 40.7128, lon: -74.006 },
  { name: "Place 2", lat: 34.0522, lon: -118.2437 },
  // Diğer konumlar...
];

 */
export function sortPlacesByDistance(places, lat, lon) {
  const sortedPlaces = [...places];
  sortedPlaces.sort((a, b) => {
    const distanceA = calculateDistance(lat, lon, a.lat, a.lon);
    const distanceB = calculateDistance(lat, lon, b.lat, b.lon);
    return distanceA - distanceB;
  });
  return sortedPlaces;
}
