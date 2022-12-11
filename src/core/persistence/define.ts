import {Either, error, success} from '../fp';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {SetterResult} from './common';
import {ReadonlyDeep} from 'type-fest';

export default <T extends any = unknown>(key: string) =>
  [
    /**
     * @throws {never}
     */
    async (): Promise<Either<T | null, unknown>> => {
      try {
        const item = await AsyncStorage.getItem(key);
        return item === null ? success(null) : success(JSON.parse(item));
      } catch (raw) {
        return error(raw);
      }
    },
    /**
     * @throws {never}
     */
    async (item?: ReadonlyDeep<T>): Promise<SetterResult> => {
      try {
        if (item === undefined) {
          await AsyncStorage.removeItem(key);
        } else {
          await AsyncStorage.setItem(key, JSON.stringify(item));
        }
        return success(undefined);
      } catch (raw) {
        return error(raw);
      }
    },
  ] as const;
