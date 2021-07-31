import defaultStorage, { StorageItems } from "./config";
import React from "react";

class Storage {
  private items: StorageItems = defaultStorage;
  private currWebsiteVersion = 1;

  constructor() {
    for (const key of Object.keys(localStorage)) {
      if (key in defaultStorage) {
        const sameKey = key as keyof StorageItems;
        const curr: ValidStorageType = JSON.parse(
          localStorage.getItem(sameKey) as string
        );
        if (typeof curr === typeof defaultStorage[sameKey]) {
          //@ts-ignore
          this.items[sameKey] = curr;
        } else
          console.error(
            `Failed to save key ${key} with value ${curr} due to failing schema`
          );
      }
    }
    this.updateValue("lastWebsiteVersion", this.currWebsiteVersion);
  }
  updateValue(key: string, val: ValidStorageType) {
    if (key in defaultStorage) {
      const sameKey = key as keyof StorageItems;
      if (typeof val === typeof defaultStorage[sameKey]) {
        //@ts-ignore
        this.items[sameKey] = val;
        localStorage.setItem(sameKey, JSON.stringify(val));
      } else
        console.error(
          `Failed to save key ${key} with value ${val} due to failing schema`
        );
    }
  }
  getValue(key: keyof StorageItems) {
    return this.items[key];
  }
}
export type ValidStorageType =
  | boolean
  | number
  | string
  | number
  | Object
  | null;
const storage = new Storage();
/**
 * Due to limitations with typescript, you must specify the type T for what the property value is
 * @param param0 Key must exist in StorageItems
 * @returns Value currently in storage and setter function
 */
const useStorage = <T>({
  key,
}: {
  key: keyof StorageItems;
}): [T, (val: T) => unknown] => {
  const tmp = React.useState<T>(storage.getValue(key) as ValidStorageType as T);
  return [
    tmp[0],
    (val: T) => {
      tmp[1](val);
      storage.updateValue(key, val);
    },
  ];
};
export default useStorage;
