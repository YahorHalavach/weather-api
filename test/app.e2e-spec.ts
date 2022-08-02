import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { ConfigModule } from '@nestjs/config';
import { HttpService } from '@nestjs/axios';
import { of } from 'rxjs';
import {
  afterDay7ISO,
  beforeDay1ISO,
  day1Description,
  day1ISO,
  day2Description,
  day2ISO,
  day6Description,
  day6ISO,
  day7Description,
  day7ISO,
  InvalidDate,
  InvalidLatitude,
  InvalidLongitude,
  lat,
  lon,
  mockResponse,
  NoDateError,
  NoLatitudeError,
  NoLongitudeError,
} from '../src/weather/mocks/mocks';
import createUrl from '../src/weather/helpers/createUrl';
import { AppModule } from '../src/app.module';

describe('AppModule (e2e)', () => {
  let app: INestApplication;
  let httpService: HttpService;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [
        AppModule,
        ConfigModule.forRoot({
          envFilePath: '.development.env',
        }),
      ],
    }).compile();

    httpService = moduleFixture.get<HttpService>(HttpService);
    jest.spyOn(httpService, 'get').mockImplementation(() => of(mockResponse));

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(new ValidationPipe());
    await app.init();
  });

  // Positive cases

  it('/weather (GET) 200 on Day 1', () => {
    return request(app.getHttpServer())
      .get(createUrl(lat, lon, day1ISO))
      .expect(200)
      .expect(day1Description);
  });

  it('/weather (GET) 200 on Day 2', () => {
    return request(app.getHttpServer())
      .get(createUrl(lat, lon, day2ISO))
      .expect(200)
      .expect(day2Description);
  });

  it('/weather (GET) 200 on Day 6', () => {
    return request(app.getHttpServer())
      .get(createUrl(lat, lon, day6ISO))
      .expect(200)
      .expect(day6Description);
  });

  it('/weather (GET) 200 on Day 7', () => {
    return request(app.getHttpServer())
      .get(createUrl(lat, lon, day7ISO))
      .expect(200)
      .expect(day7Description);
  });

  // Negative cases

  it('/weather (GET) 400 on Before Day 1', () => {
    return request(app.getHttpServer())
      .get(createUrl(lat, lon, beforeDay1ISO))
      .expect(400);
  });

  it('/weather (GET) 400 on After Day 7', () => {
    return request(app.getHttpServer())
      .get(createUrl(lat, lon, afterDay7ISO))
      .expect(400);
  });

  it('/weather (GET) 400 when NO latitude provided', () => {
    return request(app.getHttpServer())
      .get(createUrl('', lon, day1ISO))
      .expect(400)
      .expect(NoLatitudeError);
  });

  it('/weather (GET) 400 when NO longitude provided', () => {
    return request(app.getHttpServer())
      .get(createUrl(lat, '', day1ISO))
      .expect(400)
      .expect(NoLongitudeError);
  });

  it('/weather (GET) 400 when NO date provided', () => {
    return request(app.getHttpServer())
      .get(createUrl(lat, lon, ''))
      .expect(400)
      .expect(NoDateError);
  });

  it('/weather (GET) 400 on invalid latitude', async () => {
    return request(app.getHttpServer())
      .get(createUrl('1234242', lon, day1ISO))
      .expect(400)
      .expect(InvalidLatitude);
  });

  it('/weather (GET) 400 on invalid longitude', async () => {
    return request(app.getHttpServer())
      .get(createUrl(lat, '12391241', day1ISO))
      .expect(400)
      .expect(InvalidLongitude);
  });

  it('/weather (GET) 400 on invalid date format', async () => {
    return request(app.getHttpServer())
      .get(createUrl(lat, lon, '2022-2893'))
      .expect(400)
      .expect(InvalidDate);
  });

  it('/weather (GET) 400 on date timestamp', async () => {
    return request(app.getHttpServer())
      .get(createUrl(lat, lon, '1658302813000'))
      .expect(400)
      .expect(InvalidDate);
  });
});
