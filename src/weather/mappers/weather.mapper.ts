import { OpenWeather } from '../interface/open-weather.interface';
import { Weather } from '../models/weather.model';

export default (data: OpenWeather) => {
  const weatherMap: Weather[] = data.daily.map((day) => {
    return new Weather(
      new Date(day.dt * 1000).setHours(0, 0, 0, 0),
      day.weather[0].description,
    );
  });

  while (weatherMap.length > 7) weatherMap.pop();

  return weatherMap;
};
