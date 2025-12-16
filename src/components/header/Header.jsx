import React, { useEffect, useRef } from "react"
import { Link, useLocation } from "react-router-dom"
import logo from "../../assets/logo1.png"

const headerNav = [
  {
    display: "Home",
    path: "/",
  },
  {
    display: "Series",
    path: "/tv",
  },
  {
    display: "Movies",
    path: "/movie",
  },
]

const Header = () => {
  const { pathname } = useLocation()
  const headerRef = useRef(null)

  useEffect(() => {
    const shrinkHeader = () => {
      if (document.body.scrollTop > 100 || document.documentElement.scrollTop > 100) {
        headerRef.current.classList.add("shrink")
      } else {
        headerRef.current.classList.remove("shrink")
      }
    }
    window.addEventListener("scroll", shrinkHeader)
    return () => {
      window.removeEventListener("scroll", shrinkHeader)
    }
  }, [])

  const active = headerNav.findIndex((e) => e.path === pathname)

  return (
    <div
      ref={headerRef}
      className="fixed top-0 left-0 w-full z-50 transition-all duration-300 ease-in-out px-8 h-[5rem] flex items-center bg-transparent [&.shrink]:bg-[#0f1014] [&.shrink]:h-[5rem] [&.shrink]:shadow-2xl"
    >
      <div className="flex items-center justify-between w-full max-w-[1660px] mx-auto">
        <div className="logo flex items-center gap-2">
          <Link to="/">
            <img src={logo} alt="logo" className="w-[80px] hover:opacity-80 transition-opacity" />
          </Link>
        </div>
        <ul className="flex items-center gap-8 font-semibold">
          {headerNav.map((e, i) => (
            <li key={i} className={`${i === active ? "text-white border-b-2 border-white pb-1" : "text-gray-400 hover:text-white"} transition-colors text-lg cursor-pointer`}>
              <Link to={e.path}>{e.display}</Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default Header
