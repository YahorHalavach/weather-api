import { WeatherDescription } from '../dto/weather-description.dto';
import { Weather } from '../mappers/weather.map';

export default (weatherMap: Weather[], now: number) => {
  let n = -1;

  while (++n < weatherMap.length && weatherMap[n].dt < now);
  return new WeatherDescription(weatherMap[n].description);
};
