import React from "react"
import { HashRouter, Route } from "react-router-dom"
import GeneradorMixto from "../components/GeneradorMixto"
import Welcome from "../welcome/Welcome"
import "./App.css"
import Menu from "./Menu"
import Toolbar from "./Toolbar"
import GeneradorCuadradoMedio from './../components/GeneradorCuadradoMedio';
import PruebaRachas from './../components/PruebaRachas';
import TransformadaDiscreta from "../components/TransformadaDiscreta"
import PruebaChiCuadrado from './../components/PruebaChiCuadrado';
import PruebaKolmogorov from './../components/PruebaKolmogorov';
import AceptacionRechazo from './../components/AceptacionRechazo';

export default function App() {
  return (
    <HashRouter>
      <table className="app_table">
        <thead>
          <tr className="app_toolbar">
            <td colSpan={2} >
              <Toolbar />
            </td>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="app_menu">
              <Menu />
            </td>
            <td id="content" className="app_content">
              <Route exact path="/" component={Welcome} />
              <Route exact path="/mixto" component={GeneradorMixto} />
              <Route exact path="/cuadradoMedio" component={GeneradorCuadradoMedio} />
              <Route exact path="/rachas" component={PruebaRachas} />
              <Route exact path="/chiCuadrado" component={PruebaChiCuadrado} />
              <Route exact path="/kolmogorovSmirnov" component={PruebaKolmogorov} />
              <Route exact path="/transformadaDiscreta" component={TransformadaDiscreta} />
              <Route exact path="/aceptacionRechazo" component={AceptacionRechazo} />
            </td>
          </tr>
        </tbody>
      </table>
    </HashRouter >
  )
}
