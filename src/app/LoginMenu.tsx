import React from "react"
import { NavLink } from "react-router-dom"
import "./Menu.css"

export default function LoginMenu() {
  return (
    <div>
      <h6 className="menu_section">Generadores pseudoaleatorios</h6>
      <NavLink to="/mixto" className="menu_item btn btn-sm btn-link">Generador Mixto</NavLink><br />
      <NavLink to="/cuadradoMedio" className="menu_item btn btn-sm btn-link">Generador Cuadrado Medio</NavLink><br />
      <h6 className="menu_section">Pruebas de numeros pseudoaleatorios</h6>
      <NavLink to="/rachas" className="menu_item btn btn-sm btn-link">Prueba de Rachas</NavLink><br />
      <NavLink to="/chiCuadrado" className="menu_item btn btn-sm btn-link">Prueba Chi Cuadrado</NavLink><br />
      <NavLink to="/kolmogorovSmirnov" className="menu_item btn btn-sm btn-link">Prueba Kolmogorov Smirnov</NavLink><br />
      <h6 className="menu_section">Obtencion de variable aleatoria</h6>
      <NavLink to="/transformadaDiscreta" className="menu_item btn btn-sm btn-link">Transformada Discreta</NavLink><br />
      <NavLink to="/aceptacionRechazo" className="menu_item btn btn-sm btn-link">Aceptacion Rechazo</NavLink><br />
    </div>
  )
}
