import "./App.css"
import "swiper/css"
import "swiper/css/navigation"
import "swiper/css/pagination"
import { BrowserRouter } from "react-router-dom"
import Header from "./components/header/Header"
import Footer from "./components/footer/Footer"
import Routes from "./config/Routes"

function App() {
  return (
    <BrowserRouter>
      <div className="bg-[#0f1014] min-h-screen flex flex-col font-body text-white">
        <Header />
        <main className="flex-grow">
          <Routes />
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  )
}

export default App
