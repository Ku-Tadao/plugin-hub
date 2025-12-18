import { ipcInvoke } from './ipc'

/**
 * Get the user data path for Pengu Loader.
 * @returns A promise that resolves to the user data path
 * @remarks Default to %USERPROFILE%\AppData\Local\pengu_loader
 */
export function userDataPath(): Promise<string> {
  return ipcInvoke<string>('path:user-data')
}

/**
 * Get the config file path for Pengu Loader.
 * @returns A promise that resolves to the config file path
 * @remarks Default to %USERPROFILE%\AppData\Local\pengu_loader\config
 */
export function configPath(): Promise<string> {
  return ipcInvoke<string>('path:config')
}

/**
 * Get a config value.
 * @param key Config key
 * @template T Config value type, should be string, number or boolean
 * @returns A promise that resolves to the config value, or null if not found
 */
export function getConfig<T>(key: string): Promise<T | null>

/**
 * Get a config value.
 * @param key Config key
 * @param defaultValue Default value if config not found
 * @template T Config value type, should be string, number or boolean
 * @returns A promise that resolves to the config value, or null if not found
 */
export function getConfig<T>(key: string, defaultValue?: T): Promise<T>

export function getConfig<T>(key: string, defaultValue?: T): Promise<T> {
  return ipcInvoke<T>('config:get', key).then((value) => {
    if (value == null && defaultValue !== undefined) {
      return defaultValue
    }
    return value
  })
}

/**
 * Set a config value.
 * @param key Config key
 * @param value Config value
 * @template T Config value type, should be string, number or boolean
 * @returns A promise that resolves when the config value is set
 */
export function setConfig<T>(key: string, value: T): Promise<void> {
  return ipcInvoke<void>('config:set', key, value)
}