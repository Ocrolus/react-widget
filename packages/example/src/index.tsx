import React from 'react'
import { createRoot } from 'react-dom/client'
import '@example/src/index.css'
import App from '@example/src/App'

const root = createRoot(document.getElementById('root') as HTMLElement)
root.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
)