import {Platform} from 'react-native';

export const BASE_URL =
  Platform.OS === 'android'
    ? 'http://192.168.83.181:5000'
    : 'http://localhost:5000';
