import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import Header from './components/Header.jsx'
import Categories from './components/Categories.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Header />
    <Categories />
    <App />
  </StrictMode>,
)
