import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import Cadastro from './Cadastro.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Cadastro />
  </StrictMode>
)