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
import { generadorCuadradoMedio} from "../services/service";



export default function GeneradorCuadradoMedio(props: RouteComponentProps){

    const [digitos, setDigitos] = useState("")
    const [semilla, setSeed] = useState("")
    const [table, setTable] = useState<any[][]>([])

    const errorHandler = useErrorHandler()


    const acceptClick = async () => {
        try {
            errorHandler.cleanRestValidations()
            const ret = await generadorCuadradoMedio({
                cantidad_digitos_deseada: digitos as unknown as number,
                semilla: semilla as unknown as number
            })
            const aux_table: any[][] = []
            const length = Object.keys(ret['Xn']).length
            const Xn = Object.values(ret['Xn'])
            const Xn2 = Object.values(ret['X^2'])
            const cantDigitos = Object.values(ret['Cant Digitos'])
            const numeroAjustado = Object.values(ret['Numero ajustado segun 0s'])
            const parteCentral = Object.values(ret['Parte Central'])
            const nroAleatorio = Object.values(ret['Nro Aleatorio'])
            for (let index = 0; index < length; index++) {
                aux_table.push([Xn[index], Xn2[index], cantDigitos[index],
                                numeroAjustado[index], parteCentral[index], nroAleatorio[index]])
            }
            setTable(aux_table)
        } catch (error) {
            errorHandler.processRestValidations(error)
        }

    }

    return (
        <GlobalContent>
            <FormTitle>Generador Cuadrado Medio</FormTitle>

            <Form>
                <FormInput
                    label="Cantidad de digitos deseada"
                    name="digitos"
                    errorHandler={errorHandler}
                    onChange={(event) => setDigitos(event.target.value)} />

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

                {table === [] ? null : <FormLabel label = {"Longitud de período"} text={table.length.toString()}/>  }
                
                <table className="table">
                        <thead>
                        <tr>
                            <th>Xn</th>
                            <th>X^2</th>
                            <th>Cant Digitos</th>
                            <th>Numero Ajustado</th>
                            <th>Parte Central</th>
                            <th>Nro Aleatorio</th>
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
                                <td>{row[5]}</td>
                                </tr>
                            )
                        })}
                        </tbody>
                    </table>
            </Form >
        </GlobalContent >
    )
}