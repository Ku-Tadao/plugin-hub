import { createRoot, createSignal } from 'solid-js'

// Root state management
const _root = createRoot(() => {
  // Hub open state
  const [hubOpen, setHubOpen] = createSignal(false)

  return {
    hubOpen,
    setHubOpen
  }
})

// Expose to window for interop
// @ts-ignore
window.setHubOpen = _root.setHubOpen

export function useRoot() {
  return _root
}