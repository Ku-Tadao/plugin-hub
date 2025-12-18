import { ipcSend, riotPOST } from './ipc'

/**
 * Open the developer tools for the Riot Client.
 */
export function openDevTools() {
  ipcSend('open-devtools')
}

/**
 * Reload the Riot Client.
 */
export function reloadClient() {
  // ipcSend('reload-client')
  window.location.reload()
}

/**
 * Restart the Riot Client.
 */
export function restartClient() {
  // This endpoint is undocumented
  // but used by Riot client to restart itself
  riotPOST('/riot-client-lifecycle/v1/restart')
}