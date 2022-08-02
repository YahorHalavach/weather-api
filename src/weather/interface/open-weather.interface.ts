export interface OpenWeather {
  daily: [
    {
      dt: number;
      weather: [
        {
          description: string;
        },
      ];
    },
  ];
}
