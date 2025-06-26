import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
<<<<<<<< HEAD:innovatube-frontend/src/main.tsx
import './index.css'
import App from './App.tsx'
========

import App from './App.jsx'
import './index.css'

>>>>>>>> 924e37ba4266b2ce173ff76a2156272324854064:innovatube-frontend/src/main.jsx

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
