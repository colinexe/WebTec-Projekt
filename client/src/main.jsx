import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx' 
import './index.css'
import GerichtList from "./components/gerichtList.jsx"
import GerichtForm from "./components/gerichtForm.jsx"
import Navigation from "./components/Navigation.jsx"

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
    {/*
    <Navigation/>
    <GerichtForm />
    <GerichtList />
*/}
  </React.StrictMode>,
)
