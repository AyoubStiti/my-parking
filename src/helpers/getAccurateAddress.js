import axios from 'axios';

export const getAccurateAddress = async (lat, long) => {
  const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${long}&key=${process.env.GOOGLE_MAPS_API_KEY}`;
  const response = (await axios.get(url)).data;
  if (response.status !== 'OK') throw new Error(response.status);
  return response.results[0].formatted_address;
};
