const haversineFormula = (origin, destination) => {
  const { latitude: lat1, longitude: lon1 } = origin;
  const { latitude: lat2, longitude: lon2 } = destination;

  const toRadians = (degrees) => (degrees * Math.PI) / 180;
  const dLat = toRadians(lat2 - lat1);
  const dLon = toRadians(lon2 - lon1);

  const radius = 6371; // Radius of the Earth in kilometers

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRadians(lat1)) * Math.cos(toRadians(lat2)) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return Math.round(radius * c * 100) / 100;
};

module.exports = haversineFormula;
