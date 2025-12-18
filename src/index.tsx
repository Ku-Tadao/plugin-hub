/* @refresh reload */
import 'virtual:uno.css'
import './index.css'
import { render } from 'solid-js/web'
import 'solid-devtools'

import App from './App'

const id = 'pengu-hub'
let root = document.getElementById(id)

// Create root element if it doesn't exist
if (!root) {
  root = document.createElement('div')
  root.id = id
  document.body.appendChild(root)
}

// Render the application
render(() => <App />, root)