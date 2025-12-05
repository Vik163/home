import { createMMKV } from "react-native-mmkv";

const MMKVStorage = createMMKV();

export const storage = {
  setItem: (key: string, value: string | number | boolean | ArrayBuffer) => {
    MMKVStorage.set(key, value);
    return Promise.resolve(true);
  },
  getItem: (key: string) => {
    const value = MMKVStorage.getString(key);
    return Promise.resolve(value);
  },
  removeItem: (key: string) => {
    MMKVStorage.remove(key);
    return Promise.resolve();
  },
};
