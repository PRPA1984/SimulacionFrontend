/* eslint-disable @typescript-eslint/no-unused-expressions */
import React, { useState } from "react";
import { RouteComponentProps } from "react-router-dom";
import DangerLabel from "../common/components/DangerLabel";
import Form from "../common/components/Form";
import FormAcceptButton from "../common/components/FormAcceptButton";
import FormButton from "../common/components/FormButton";
import FormButtonBar from "../common/components/FormButtonBar";
import FormInput from "../common/components/FormInput";
import FormTitle from "../common/components/FormTitle";
import GlobalContent from "../common/components/GlobalContent";
import { useErrorHandler } from "../common/utils/ErrorHandler";
import { goHome } from "../common/utils/Tools";
import { generadorCuadradoMedio, transformadaDiscreta} from "../services/service";



export default function TransformadaDiscreta(props: RouteComponentProps){

    const [cantVa, setCantVa] = useState("")
    const [pairs, setPairs] = useState(0)
    const [diccionariosFrecuenciaVA, setDiccionariosFrecuenciaVA] = useState<any[]>([])
    const [table, setTable] = useState<any[][]>([])
    
    interface VaFrec {
        variableAleatoria: string,
        frecuenciaObservada: string
    }

    const errorHandler = useErrorHandler()


    const acceptClick = async () => {
        try {
            errorHandler.cleanRestValidations()
            const ret = await transformadaDiscreta({dictFrecuencia: diccionariosFrecuenciaVA, cantVa: cantVa})

            const aux_table: any[][] = []
            const length = Object.keys(ret['V.A.']).length
            const VA = Object.values(ret['V.A.'])
            const random = Object.values(ret['Random'])
            for (let index = 0; index < length; index++) {
            aux_table.push([VA[index], random[index]])
            }
            setTable(aux_table)
        } catch (error) {
            errorHandler.processRestValidations(error)
        }
    }

    const modificarDiccionario = (valor:string, index:number, propiedad:string) => {
        const aux_dict = diccionariosFrecuenciaVA
        aux_dict[index][propiedad] = valor
        setDiccionariosFrecuenciaVA(aux_dict)
    }

    const eliminarUltimaFilaDiccionario = () => {
        const aux_dict = diccionariosFrecuenciaVA
        aux_dict.pop()
        setDiccionariosFrecuenciaVA(aux_dict)
        setPairs(pairs - 1)

    }

    const agregarFila = () => {
        setPairs(pairs + 1)
        const aux_dict = diccionariosFrecuenciaVA
        aux_dict.push({variableAleatoria: "", frecuenciaObservada: ""})
        setDiccionariosFrecuenciaVA(aux_dict)
    }

    const dictInputs = () => {
        const aux_array = []
        for (let index = 0; index < pairs; index++) {
            aux_array.push(<tr>
                                <td><FormInput
                                    label="Variable Aleatoria"
                                    name="VA"
                                    errorHandler={errorHandler}
                                    onChange={(event) => modificarDiccionario(event.target.value, index, "variableAleatoria")} /></td>
                                <td><FormInput
                                    label="Frecuencia Observada"
                                    name="FO"
                                    errorHandler={errorHandler}
                                    onChange={(event) => modificarDiccionario(event.target.value, index, "frecuenciaObservada")} /></td>
                            </tr>)
        }
        return aux_array
    }

    return (
        <GlobalContent>
            <FormTitle>Transformada Discreta</FormTitle>

            <Form>
                <h6>Utilice el boton Agregar y Eliminar para modificar sus pares variable - frecuencia</h6>
                <table className="table">
                    <thead>
                    <tr>
                        <th></th>
                        <th></th>
                    </tr>
                    </thead>
                    <tbody>
                    {dictInputs()}
                    </tbody>
                </table>
                <FormButtonBar>
                    <FormAcceptButton label="Agregar" onClick={() => {agregarFila()}}/>
                    <FormButton label="Eliminar" onClick={() => eliminarUltimaFilaDiccionario()} />
                </FormButtonBar>
                <FormInput
                    label="Cantidad de variables aleatorias a generar"
                    name="digitos"
                    errorHandler={errorHandler}
                    onChange={(event) => setCantVa(event.target.value)} />

                <DangerLabel message={errorHandler.errorMessage} />

                <FormButtonBar>
                    <FormAcceptButton label="Generar" onClick={acceptClick} />
                    <FormButton label="Cancelar" onClick={() => goHome(props)} />
                </FormButtonBar>

                <table className="table">
                        <thead>
                        <tr>
                            <th>Nro Aleatorio</th>
                            <th>Variable Aleatoria</th>
                        </tr>
                        </thead>
                        <tbody>
                        {table.map((row, index) => {
                            return (
                                <tr key={index}>
                                <td>{row[1]}</td>
                                <td>{row[0]}</td>
                                </tr>
                            )
                        })}
                        </tbody>
                </table>
            </Form >
        </GlobalContent >
    )
}