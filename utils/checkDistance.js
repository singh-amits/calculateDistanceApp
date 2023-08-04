export const checkDistance = (lat1, lon1, lat2, lon2) => {
  //using  Haversine formula to calculate distance
  const toRadians = degrees => {
    return (degrees * Math.PI) / 180;
  };

  const earthRadiusInKm = 6371; // Earth's radius in kilometers

  const distanceLatitude = toRadians(lat2 - lat1);
  const distanceLongitude = toRadians(lon2 - lon1);

  const a =
    Math.sin(distanceLatitude / 2) * Math.sin(distanceLatitude / 2) +
    Math.cos(toRadians(lat1)) *
      Math.cos(toRadians(lat2)) *
      Math.sin(distanceLongitude / 2) *
      Math.sin(distanceLongitude / 2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  const distanceInKm = earthRadiusInKm * c;
  const distnaceInMiles = distanceInKm * 0.621371;
  // const distanceObject = {
  //   distanceInKm: distanceInKm,
  //   distnaceInMiles: distnaceInMiles,
  // };
  return distanceInKm;
};
