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
import { aceptacionRechazo, generadorMixto } from "../services/service";



export default function AceptacionRechazo(props: RouteComponentProps){

    const [a, setA] = useState("")
    const [b, setB] = useState("")
    const [M, setM] = useState("")
    const [funcion, setFuncion] = useState("")
    const [cant_Va, setCantVa] = useState("")
    const [table, setTable] = useState<any[][]>([])


    const errorHandler = useErrorHandler()


    const acceptClick = async () => {
    try {
        errorHandler.cleanRestValidations()
        const ret = await aceptacionRechazo({
            funcion: funcion,
            a: a,
            b: b,
            M: M,
            cant_va: cant_Va
        })
        const aux_table: any[][] = []
        const length = Object.keys(ret['r1']).length
        const r1 = Object.values(ret['r1'])
        const r2 = Object.values(ret['r2'])
        const VA = Object.values(ret['v.a.x'])
        const fx = Object.values(ret['f(x)'])
        const fxM = Object.values(ret['f(x)/M'])
        
        for (let index = 0; index < length; index++) {
        aux_table.push([r1[index] as any, r2[index] as any, VA[index] as any,
                        fx[index] as any, fxM[index] as any])
        }
        setTable(aux_table)
    } catch (error) {
        errorHandler.processRestValidations(error)
    }
    }

    return (
        <GlobalContent>
            <FormTitle>Aceptación Rechazo</FormTitle>

            <Form>
                <FormInput
                    label="Valor A"
                    name="a"
                    errorHandler={errorHandler}
                    onChange={(event) => setA(event.target.value)} />

                <FormInput
                    label="Valor B"
                    name="b"
                    errorHandler={errorHandler}
                    onChange={(event) => setB(event.target.value)} />

                <FormInput
                    label="Valor M"
                    name="m"
                    errorHandler={errorHandler}
                    onChange={(event) => setM(event.target.value)} />

                <FormInput
                    label="f(x) = "
                    name="funcion"
                    errorHandler={errorHandler}
                    onChange={(event) => setFuncion(event.target.value)} />

                <FormInput
                    label="Cantidad de variables aleatorias a generar"
                    name="cantVa"
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
                            <th>r1</th>
                            <th>r2</th>
                            <th>Variable Aleatoria</th>
                            <th>f(v.a.x)</th>
                            <th>f(v.a.x)/M</th>
                        </tr>
                        </thead>
                        <tbody>
                        {table.map((row, index) => {
                            return (
                                <tr key={index}>
                                <td>{row[0]}</td>
                                <td>{row[1]}</td>
                                <td>{row[2]}</td>
                                <td>{row[3]}</td>
                                <td>{row[4]}</td>
                                </tr>
                            )
                        })}
                        </tbody>
                    </table>
            </Form >
        </GlobalContent >
    )
}