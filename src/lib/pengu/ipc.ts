
declare global {
  interface Window {
    __riot: {
      appPort: number
      authToken: string
    }
    __penguIpc: {
      send<T>(type: string, ...args: any[]): Promise<T>
    }
  }
}

/**
 * Send IPC message to CDP backend.
 * @param type Custom message type
 * @param args Arguments
 */
export function ipcSend(type: string, ...args: any[]) {
  if (window.__penguIpc) {
    window.__penguIpc.send(type, ...args)
  }
}

/**
 * Invoke IPC message to CDP backend.
 * @param type Custom message type
 * @param args Arguments
 * @returns Promise resolving to the response
 */
export function ipcInvoke<T>(type: string, ...args: any[]): Promise<T> {
  if (window.__penguIpc) {
    return window.__penguIpc.send<T>(type, ...args)
  }
  return Promise.reject(new Error('Pengu IPC not available'))
}

/**
 * Get RiotClientServices authentication info.
 */
export function getRiotAuth() {
  const riot = window.__riot || {}
  const basic = btoa(`riot:${window.__riot?.authToken || ''}`)
  return {
    port: riot.appPort,
    token: riot.authToken,
    authorization: `Basic ${basic}`
  }
}

/**
 * Perform a GET request to RiotClientServices.
 * @param path Request path
 * @returns Parsed JSON response
 */
export async function riotGET<T>(path: string): Promise<T> {
  const { port, authorization } = getRiotAuth()
  const res = await fetch(`https://127.0.0.1:${port}${path}`, {
    headers: {
      Authorization: authorization
    }
  })
  return await res.json()
}

/**
 * Perform a POST request to RiotClientServices.
 * @param path Request path
 * @param body Request body
 * @returns Parsed JSON response
 */
export async function riotPOST<T = void>(path: string, body?: any): Promise<T> {
  const { port, authorization } = getRiotAuth()
  const res = await fetch(`https://127.0.0.1:${port}${path}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: authorization
    },
    body: JSON.stringify(body)
  })
  return await res.json()
}