import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

import { Print, login} from './services/authService'

function App() {

  return (
    <>
      <h1>Vite + React</h1>

      <Print username="JSnow" password="WinterIsComing123" />
    </>
  )
}

export default App
