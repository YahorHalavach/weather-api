import { HttpModule, HttpService } from '@nestjs/axios';
import { HttpException } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import { of } from 'rxjs';
import {
  afterDay7ISO,
  beforeDay1ISO,
  day1Description,
  day2Description,
  day2ISO,
  day6Description,
  day6ISO,
  day7Description,
  day7ISO,
  mockQuery,
  mockResponse,
  Next7daysException,
} from './mocks/mocks';
import { WeatherService } from './weather.service';

describe('WeatherService', () => {
  let weatherService: WeatherService;
  let httpService: HttpService;
  let httpSpy: jest.SpyInstance;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [WeatherService],
      imports: [
        HttpModule,
        ConfigModule.forRoot({
          envFilePath: '.development.env',
        }),
      ],
    }).compile();

    weatherService = module.get<WeatherService>(WeatherService);
    httpService = module.get<HttpService>(HttpService);
    httpSpy = jest
      .spyOn(httpService, 'get')
      .mockImplementation(() => of(mockResponse));
  });

  // Positive cases
  it('Should be defined', () => {
    expect(weatherService).toBeDefined();
  });

  it('Should call getWeatherDescription methods with expected arguments', () => {
    const getWeatherInfoSpy = jest.spyOn(
      weatherService,
      'getWeatherDescription',
    );

    weatherService.getWeatherDescription(mockQuery);
    expect(getWeatherInfoSpy).toHaveBeenCalledWith(mockQuery);
  });

  // Boundry values
  // Valid: Day 1, Day 2, Day 6, Day 7
  // Invalid: Before Day 1, After Day 7

  it('Should respond with weather description for Day 1', async () => {
    const result = await weatherService.getWeatherDescription(mockQuery);

    expect(httpSpy).toBeCalledTimes(1);
    expect(result).toEqual(day1Description);
  });

  it('Should respond with weather description for Day 2', async () => {
    const newMockQuery = {
      ...mockQuery,
      date: day2ISO,
    };

    const result = await weatherService.getWeatherDescription(newMockQuery);

    expect(httpSpy).toBeCalledTimes(1);
    expect(result).toEqual(day2Description);
  });

  it('Should respond with weather description for Day 6', async () => {
    const newMockQuery = {
      ...mockQuery,
      date: day6ISO,
    };

    const result = await weatherService.getWeatherDescription(newMockQuery);

    expect(httpSpy).toBeCalledTimes(1);
    expect(result).toEqual(day6Description);
  });

  it('Should respond with weather description for Day 7', async () => {
    const newMockQuery = {
      ...mockQuery,
      date: day7ISO,
    };

    const result = await weatherService.getWeatherDescription(newMockQuery);

    expect(httpSpy).toBeCalledTimes(1);
    expect(result).toEqual(day7Description);
  });

  // Negative cases

  it('Should throw an HttpException if the date provided is before Day 1', async () => {
    const newMockQuery = {
      ...mockQuery,
      date: beforeDay1ISO,
    };

    try {
      await weatherService.getWeatherDescription(newMockQuery);
    } catch (err) {
      expect(httpSpy).toHaveBeenCalledTimes(1);
      expect(err).toBeInstanceOf(HttpException);
      expect(err).toEqual(Next7daysException);
    }
  });

  it('Should throw an HttpException if the date provided is after Day 7', async () => {
    const newMockQuery = {
      ...mockQuery,
      date: afterDay7ISO,
    };

    try {
      await weatherService.getWeatherDescription(newMockQuery);
    } catch (err) {
      expect(httpSpy).toHaveBeenCalledTimes(1);
      expect(err).toBeInstanceOf(HttpException);
      expect(err).toEqual(Next7daysException);
    }
  });
});
