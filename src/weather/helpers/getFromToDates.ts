import { Weather } from '../mappers/weather.map';

export default (weatherMap: Weather[]) => {
  const from = weatherMap[0].dt;
  const to = weatherMap[weatherMap.length - 1].dt;
  return [from, to];
};
