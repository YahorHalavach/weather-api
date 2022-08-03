import { HttpException, HttpStatus } from '@nestjs/common';
import { AxiosResponse } from 'axios';
import { WeatherQueryDto } from '../dto/weather-query.dto';
import { WeatherDescription } from '../dto/weather-description.dto';

// Latitude & Longitude
export const lat = '40.730610';
export const lon = '-73.935242';

// Dates
export const beforeDay1 = new Date(Date.now() - 86400 * 1000);
export const day1 = new Date(Date.now());
export const day2 = new Date(Date.now() + 86400 * 1000);
export const day3 = new Date(Date.now() + 86400 * 2 * 1000);
export const day4 = new Date(Date.now() + 86400 * 3 * 1000);
export const day5 = new Date(Date.now() + 86400 * 4 * 1000);
export const day6 = new Date(Date.now() + 86400 * 5 * 1000);
export const day7 = new Date(Date.now() + 86400 * 6 * 1000);
export const afterDay7 = new Date(Date.now() + 86400 * 7 * 1000);

// Boundary values
export const beforeDay1ISO = beforeDay1.toISOString();
export const day1ISO = day1.toISOString();
export const day2ISO = day2.toISOString();
export const day6ISO = day6.toISOString();
export const day7ISO = day7.toISOString();
export const afterDay7ISO = afterDay7.toISOString();

// There is a case when OpenWeatherApi has 8 dates in response
export const mockResponse: AxiosResponse = {
  data: {
    daily: [
      {
        // Day 1 UNIX Timestamp
        dt: Math.floor(day1.getTime() / 1000),
        weather: [
          {
            description: 'light rain',
          },
        ],
      },
      {
        // Day 2 UNIX Timestamp
        dt: Math.floor(day2.getTime() / 1000),
        weather: [
          {
            description: 'cloudy',
          },
        ],
      },
      {
        // Day 3 UNIX Timestamp
        dt: Math.floor(day3.getTime() / 1000),
        weather: [
          {
            description: 'sunny',
          },
        ],
      },
      {
        // Day 4 UNIX Timestamp
        dt: Math.floor(day4.getTime() / 1000),
        weather: [
          {
            description: 'clear sky',
          },
        ],
      },
      {
        // Day 5 UNIX Timestamp
        dt: Math.floor(day5.getTime() / 1000),
        weather: [
          {
            description: 'heavy rain',
          },
        ],
      },
      {
        // Day 6 UNIX Timestamp
        dt: Math.floor(day6.getTime() / 1000),
        weather: [
          {
            description: 'storm',
          },
        ],
      },
      {
        // Day 7 UNIX Timestamp
        dt: Math.floor(day7.getTime() / 1000),
        weather: [
          {
            description: 'strong wind',
          },
        ],
      },
      {
        // Day 8 UNIX Timestamp
        dt: Math.floor(afterDay7.getTime() / 1000),
        weather: [
          {
            description: 'snow',
          },
        ],
      },
    ],
  },
  status: 200,
  statusText: 'OK',
  headers: {},
  config: {},
};

// Unit test
export const day1Description: WeatherDescription = {
  description: 'light rain',
};

export const day2Description: WeatherDescription = {
  description: 'cloudy',
};

export const day6Description: WeatherDescription = {
  description: 'storm',
};

export const day7Description: WeatherDescription = {
  description: 'strong wind',
};

// Unit test query
export const mockQuery: WeatherQueryDto = {
  lat: lat,
  lon: lon,
  date: day1ISO,
};

// Exceptions & Errors
export const Next7daysException = new HttpException(
  'please provide date within next 7 days starting today',
  HttpStatus.BAD_REQUEST,
);

export const NoLatitudeError = {
  statusCode: 400,
  message: [
    'please provide latitude in query',
    'lat must be a latitude string or number',
  ],
  error: 'Bad Request',
};

export const NoLongitudeError = {
  statusCode: 400,
  message: [
    'please provide longitude in query',
    'lon must be a longitude string or number',
  ],
  error: 'Bad Request',
};

export const NoDateError = {
  statusCode: 400,
  message: [
    'please provide date in query',
    'date must be a valid ISO 8601 date string',
  ],
  error: 'Bad Request',
};

export const InvalidLatitude = {
  statusCode: 400,
  message: ['lat must be a latitude string or number'],
  error: 'Bad Request',
};

export const InvalidLongitude = {
  statusCode: 400,
  message: ['lon must be a longitude string or number'],
  error: 'Bad Request',
};

export const InvalidDate = {
  statusCode: 400,
  message: ['date must be a valid ISO 8601 date string'],
  error: 'Bad Request',
};
