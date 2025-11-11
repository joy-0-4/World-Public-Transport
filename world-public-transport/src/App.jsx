import './App.css'
import { Routes, Route } from "react-router-dom"
import Header from './elements/Header.jsx'
import Home from "./pages/Home.jsx"
import AboutUs from "./pages/AboutUs.jsx"
import EditCompany from './pages/EditCompany.jsx'
import ShowCompany from './pages/ShowCompany.jsx'

function App() {
  return (
    <div className="page">
      <Header/>

      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/aboutUs" element={<AboutUs/>} />
        <Route path="/newCompany" element={<EditCompany/>} />
        <Route path="/editCompany/:id" element={<EditCompany/>} />
        <Route path="/company/:id" element={<ShowCompany />} />
        <Route path="*" element={<h1>404 Page not Found</h1>} />
      </Routes>
    </div>
  )
}

export default App
