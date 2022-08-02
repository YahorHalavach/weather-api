import {
  IsISO8601,
  IsLatitude,
  IsLongitude,
  IsNotEmpty,
} from 'class-validator';

export class WeatherQueryDto {
  @IsLatitude()
  @IsNotEmpty({
    message: 'please provide latitude in query',
  })
  readonly lat: string;

  @IsLongitude()
  @IsNotEmpty({ message: 'please provide longitude in query' })
  readonly lon: string;

  @IsISO8601()
  @IsNotEmpty({ message: 'please provide date in query' })
  readonly date: string;
}
