import React from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'
import 'bootstrap/dist/css/bootstrap.min.css'

import '../resources/index_style.css'
import '../resources/request_ship_style.css'
import '../resources/ship_style.css'
createRoot(document.getElementById('root')!).render(<React.StrictMode><App /></React.StrictMode>)
