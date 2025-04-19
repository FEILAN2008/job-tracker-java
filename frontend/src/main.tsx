
import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import App from './App'
import { registerSW } from 'virtual:pwa-register'

registerSW({ immediate: true });
ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<App />} />
            </Routes>
        </BrowserRouter>
    </React.StrictMode>
)
