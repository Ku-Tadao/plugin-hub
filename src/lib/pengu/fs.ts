import { ipcInvoke } from './ipc'

/**
 * Filesystem error type
 */
export type FsError = {
  code:
  | 'not_found'
  | 'permission_denied'
  | 'invalid_path'
  | 'io_error'
  | 'unknown'
  message: string
}

function sanitizePath(path: string): string {
  // Check empty path
  if (!path || typeof path !== 'string') {
    throw {
      code: 'invalid_path',
      message: 'Path cannot be null or empty'
    } as FsError
  }
  // Deny path traversal
  if (path.includes('..')) {
    throw {
      code: 'invalid_path',
      message: 'Path traversal is not allowed'
    } as FsError
  }
  return path.replace(/\\/g, '/')
}

/**
 * Check if file or directory exists.
 * @param path File or directory path
 * @returns A promise that resolves to true if exists, false otherwise
 * @throws {FsError}
 */
export function exists(path: string): Promise<boolean> {
  path = sanitizePath(path)
  return ipcInvoke<boolean>('fs:exists', path)
}

/**
 * Read entire file as string.
 * @param path File path
 * @param encoding File encoding, default is 'utf8'
 * @returns A promise that resolves to file content as string
 * @throws {FsError}
 */
export function readFile(
  path: string,
  encoding?: 'utf8'
): Promise<string>

/**
 * Read entire file as binary.
 * @param path File path
 * @param encoding File encoding, must be 'binary'
 * @returns A promise that resolves to file content as Uint8Array
 * @throws {FsError}
 */
export function readFile(
  path: string,
  encoding: 'binary'
): Promise<Uint8Array>

export function readFile(
  path: string,
  encoding: 'utf8' | 'binary' = 'utf8'
): Promise<string | Uint8Array> {
  // Non-utf8 encoding not implemented yet
  if (encoding === 'utf8') {
    throw new Error('Not implemented')
  }
  path = sanitizePath(path)
  return ipcInvoke<string | Uint8Array>('fs:readFile', path, 'utf8')
}

/**
 * Write data to file.
 * @param path File path
 * @param data Data to write
 * @returns A promise that resolves when the write is complete
 * @throws {FsError}
 */
export function writeFile(
  path: string,
  data: string | Uint8Array
): Promise<void> {
  if (typeof data !== 'string') {
    throw new Error('Not implemented')
  }
  path = sanitizePath(path)
  return ipcInvoke<void>('fs:writeFile', path, data)
}

/**
 * Read directory contents.
 * @param path Directory path
 * @param options Options object
 * @returns A promise that resolves to an array of file and directory names
 * @throws {FsError}
 */
export function readdir(
  path: string,
  options?: {
    recursive: false
  }
): Promise<string[]> {
  path = sanitizePath(path)
  options = options || { recursive: false }
  return ipcInvoke<string[]>('fs:readdir', path, options)
}

/**
 * Get file or directory statistics.
 * @param path File or directory path
 * @returns A promise that resolves to an object containing statistics
 * @throws {FsError}
 */
export function stat(
  path: string
): Promise<{
  isFile: boolean
  isDirectory: boolean
  size: number
}> {
  path = sanitizePath(path)
  return ipcInvoke<{
    isFile: boolean
    isDirectory: boolean
    size: number
  }>('fs:stat', path)
}

/**
 * Remove file or directory.
 * @param path File or directory path
 * @returns A promise that resolves when the removal is complete
 * @throws {FsError}
 */
export function rm(
  path: string
): Promise<void> {
  path = sanitizePath(path)
  return ipcInvoke<void>('fs:rm', path)
}

export default {
  exists,
  readFile,
  writeFile,
  readdir,
  stat,
  rm
}