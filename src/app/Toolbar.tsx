import React from "react"
import "./Toolbar.css"
import { environment } from "./environment/environment"

export default function Toolbar() {
  return (
    <nav className="navbar navbar-expand-sm bg-dark navbar-dark d-flex shadow">
      <div className="toolbar_title navbar-brand flex-grow-1">
        Generadores, Pruebas de Generadores y Obtencion de Variables Aleatorias
      </div>
    </nav>
  )
}
