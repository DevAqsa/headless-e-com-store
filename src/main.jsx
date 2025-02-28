import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { MyStoreProvider } from './MyStoreContext.jsx'

import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <MyStoreProvider>
  <StrictMode>
    <App />
  </StrictMode>
  </MyStoreProvider>
)
