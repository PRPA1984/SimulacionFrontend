/* eslint-disable @typescript-eslint/no-unused-expressions */
import React, { useState } from "react";
import { RouteComponentProps } from "react-router-dom";
import DangerLabel from "../common/components/DangerLabel";
import Form from "../common/components/Form";
import FormAcceptButton from "../common/components/FormAcceptButton";
import FormButton from "../common/components/FormButton";
import FormButtonBar from "../common/components/FormButtonBar";
import FormInput from "../common/components/FormInput";
import FormLabel from "../common/components/FormLabel";
import FormTitle from "../common/components/FormTitle";
import GlobalContent from "../common/components/GlobalContent";
import { useErrorHandler } from "../common/utils/ErrorHandler";
import { goHome } from "../common/utils/Tools";
import { generadorMixto } from "../services/service";



export default function GeneradorMixto(props: RouteComponentProps){

    const [a, setA] = useState("")
    const [b, setB] = useState("")
    const [m, setM] = useState("")
    const [seed, setSeed] = useState("")
    const [table, setTable] = useState<any[][]>([])

    const errorHandler = useErrorHandler()


    const acceptClick = async () => {
    try {
        errorHandler.cleanRestValidations()
        const ret = await generadorMixto({a: a as unknown as number,  
            b: b as unknown as number, 
            m: m as unknown as number,
            semilla: seed as unknown as number,
        })
        const aux_table: any[][] = []
        const length = Object.keys(ret['Xn+1']).length
        const Xn1 = Object.values(ret['Xn+1'])
        const NA = Object.values(ret['Nro Aleatorio'])
        for (let index = 0; index < length; index++) {
        aux_table.push([Xn1[index], NA[index]])
        }
        setTable(aux_table)
    } catch (error) {
        errorHandler.processRestValidations(error)
    }
    }

    return (
        <GlobalContent>
            <FormTitle>Generador Mixto</FormTitle>

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
                    label="Semilla"
                    name="seed"
                    errorHandler={errorHandler}
                    onChange={(event) => setSeed(event.target.value)} />
                <DangerLabel message={errorHandler.errorMessage} />

                <FormButtonBar>
                    <FormAcceptButton label="Generar" onClick={acceptClick} />
                    <FormButton label="Cancelar" onClick={() => goHome(props)} />
                </FormButtonBar>
                {table !== [] ? <FormLabel label = {"Longitud de período"} text={table.length.toString()}/> : null }                <table className="table">
                        <thead>
                        <tr>
                            <th>Xn+1</th>
                            <th>Nro Aleatorio</th>
                        </tr>
                        </thead>
                        <tbody>
                        {table.map((row, index) => {
                            return (
                                <tr key={index}>
                                <td>{row[0]}</td>
                                <td>{row[1]}</td>
                                </tr>
                            )
                        })}
                        </tbody>
                    </table>
            </Form >
        </GlobalContent >
    )
}