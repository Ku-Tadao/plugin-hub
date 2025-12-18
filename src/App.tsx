import type { Component } from 'solid-js'
import DemoComp from '@components/DemoComp'

const App: Component = () => {
  return (
    <div class="fixed z-100 inset-0 bg-black/50 flex items-center justify-center">
      <div class="text-4xl bg-[rebeccapurple] text-white px-8 py-4">
        Hello from Plugin Hub!
      </div>
      <DemoComp />
    </div>
  )
}

export default App