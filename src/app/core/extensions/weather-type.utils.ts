export type WeatherType = 'sunny' | 'cloudy' | 'rainy' | 'snowy' | 'unknown';

export function getWeatherType(conditionCode: number): WeatherType {
  if (conditionCode === 1000) {
    return 'sunny';
  }

  if (
    [1003, 1006, 1009, 1030, 1135, 1147].includes(conditionCode)
  ) {
    return 'cloudy';
  }

  if (
    (conditionCode >= 1063 && conditionCode <= 1087) ||
    (conditionCode >= 1150 && conditionCode <= 1201) ||
    (conditionCode >= 1240 && conditionCode <= 1246) ||
    (conditionCode >= 1273 && conditionCode <= 1276)
  ) {
    return 'rainy';
  }

  if (
    (conditionCode >= 1066 && conditionCode <= 1072) ||
    (conditionCode >= 1114 && conditionCode <= 1117) ||
    (conditionCode >= 1210 && conditionCode <= 1237) ||
    (conditionCode >= 1249 && conditionCode <= 1264) ||
    (conditionCode >= 1279 && conditionCode <= 1282)
  ) {
    return 'snowy';
  }

  return 'unknown';
}
