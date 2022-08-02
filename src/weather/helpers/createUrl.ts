export default (lat: string, lon: string, date: string) => {
  return `/weather?lat=${lat}&lon=${lon}&date=${date}`;
};
