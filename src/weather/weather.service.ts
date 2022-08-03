import { HttpService } from '@nestjs/axios';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { lastValueFrom, map, Observable } from 'rxjs';
import { WEATHER_API_URL } from './constants/urls';
import { OpenWeather } from './interface/open-weather.interface';
import getFromToDates from './helpers/getFromToDates';
import findDateWeather from './helpers/findDateWeather';
import mapWeatherData from './mappers/weather.mapper';
import { WeatherDescription } from './dto/weather-description.dto';
import { WeatherQueryDto } from './dto/weather-query.dto';

@Injectable()
export class WeatherService {
  constructor(private readonly httpService: HttpService) {}

  async getWeatherDescription(
    query: WeatherQueryDto,
  ): Promise<WeatherDescription> {
    const { lat, lon, date } = query;

    const observable: Observable<OpenWeather> = this.httpService
      .get(
        `${WEATHER_API_URL}?lat=${lat}&lon=${lon}&appid=${process.env.WEATHER_API_KEY}`,
      )
      .pipe(map((res) => res.data));
    const data: OpenWeather = await lastValueFrom(observable);
    const weatherMap = mapWeatherData(data);

    const now = new Date(date).setHours(0, 0, 0, 0);
    const [from, to] = getFromToDates(weatherMap);

    if (now < from || now > to)
      throw new HttpException(
        'please provide date within next 7 days starting today',
        HttpStatus.BAD_REQUEST,
      );

    return findDateWeather(weatherMap, now);
  }
}
