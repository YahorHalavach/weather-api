import { HttpModule } from '@nestjs/axios';
import { Test, TestingModule } from '@nestjs/testing';
import { day1Description, mockQuery } from './mocks/mocks';
import { WeatherController } from './weather.controller';
import { WeatherService } from './weather.service';

describe('WeatherController', () => {
  let weatherController: WeatherController;

  const mockWeatherService = {
    getWeatherDescription: jest.fn().mockImplementation(() => day1Description),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [WeatherController],
      providers: [WeatherService],
      imports: [HttpModule],
    })
      .overrideProvider(WeatherService)
      .useValue(mockWeatherService)
      .compile();

    weatherController = module.get<WeatherController>(WeatherController);
  });

  // Positive cases

  it('Should be defined', () => {
    expect(weatherController).toBeDefined();
  });

  it('Should return weather description', async () => {
    expect(await weatherController.getWeatherDescription(mockQuery)).toEqual(
      day1Description,
    );
  });

  it('Should be called with provided arguments', () => {
    expect(mockWeatherService.getWeatherDescription).toHaveBeenCalledWith(
      mockQuery,
    );
  });

  //-------------------------------------------------------------
  // Due to validation pipe negative cases have been moved to E2E
});
