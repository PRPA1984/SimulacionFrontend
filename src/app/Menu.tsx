import React from "react"
import LoginMenu from "./LoginMenu"
import "./Menu.css"
export default function Menu() {

  const menu = <LoginMenu />

  return (
    <div className="menu_div navbar-nav bg-light shadow">
      {menu}
    </div>
  )
}
