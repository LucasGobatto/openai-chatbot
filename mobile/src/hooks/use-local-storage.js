import AsyncStorage from '@react-native-async-storage/async-storage';

export function useLocalStorage(key) {
  const set = async (value) => {
    try {
      await AsyncStorage.setItem(key, JSON.stringify(value));
    } catch (e) {
      console.error(`useLocalStorage.set key ${key} error - ${error.message}`);
    }
  };

  const get = async () => {
    try {
      const data = await AsyncStorage.getItem(key);

      return JSONSafeParse(data);
    } catch (e) {
      console.error(`useLocalStorage.get key ${key} error - ${error.message}`);

      return undefined;
    }
  };

  return { set, get };
}

function JSONSafeParse(value) {
  try {
    return JSON.parse(value);
  } catch {
    return value;
  }
}
