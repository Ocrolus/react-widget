import React from 'react'
import { createRoot } from 'react-dom/client'
import 'packages/example/src/index.css'
import App from 'packages/example/src/App'

const root = createRoot(document.getElementById('root') as HTMLElement)
root.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>,
)
