import { Controller, Get, Query } from '@nestjs/common';
import { WeatherQueryDto } from './dto/weather-query.dto';
import { WeatherDescription } from './dto/weather-description.dto';
import { WeatherService } from './weather.service';

@Controller('weather')
export class WeatherController {
  constructor(private readonly weatherService: WeatherService) {}

  @Get()
  async getWeatherDescription(
    @Query() query: WeatherQueryDto,
  ): Promise<WeatherDescription> {
    return await this.weatherService.getWeatherDescription(query);
  }
}
