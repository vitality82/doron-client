import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'

/**
 * React.StrictMode renders components twice in DEV mode - this is intentional,
 * in order to detect any problems. It is recommended to keep it on.
 */
ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  // <React.StrictMode>
    <App />
  // </React.StrictMode>,
)
