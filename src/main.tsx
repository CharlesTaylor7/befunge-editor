import React from 'react'
import ReactDOM from 'react-dom/client'
import App from '@/components/App.tsx'
import '@/styles/tailwind.css'

import './style.css'

import Alpine from 'alpinejs'

// suggested in the Alpine docs:
// make Alpine on window available for better DX
window.Alpine = Alpine

Alpine.start()

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
