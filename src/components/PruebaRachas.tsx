/* eslint-disable react-hooks/rules-of-hooks */
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
import { generadorCuadradoMedio, generadorMixto, pruebaRachas } from "../services/service";



export default function PruebaRachas(props: RouteComponentProps){

    const [estadistico, setEstadistico] = useState("")
    const [listaAleatorios, setListaAleatorios] = useState("")
    const [flag, setFlag] = useState("")
    const [valorPrueba, setValorPrueba] = useState("")

    const errorHandler = useErrorHandler()


    const [a, setA] = useState("")
    const [b, setB] = useState("")
    const [m, setM] = useState("")
    const [seed, setSeed] = useState("")

    const [digitos, setDigitos] = useState("")
    

    const acceptClick = async () => {
    try {
        errorHandler.cleanRestValidations()
        let lista_aux = ""
        if (flag === "Mixto"){
            const mixto = await generadorMixto({a: a as unknown as number,  
                b: b as unknown as number, 
                m: m as unknown as number,
                semilla: seed as unknown as number,
            })
            lista_aux = Object.values(mixto["Nro Aleatorio"]).toString()
        }
        else if(flag === "Cuadrado Medio"){
            const cm = await generadorCuadradoMedio({
                cantidad_digitos_deseada: digitos as unknown as number,
                semilla: seed as unknown as number
            })
            lista_aux = Object.values(cm['Nro Aleatorio']).toString()
            console.log(listaAleatorios)
        }
        if (lista_aux === ""){
            lista_aux = listaAleatorios
        }
        const ret = await pruebaRachas({
            numeros: lista_aux,
            estadistico: estadistico
        })
        setValorPrueba(ret["value"])
    } catch (error) {
        errorHandler.processRestValidations(error)
        }
    }

    if (flag === ""){
        return (
        <GlobalContent>
            <FormTitle>¿Como desea ingresar sus datos?</FormTitle>
            <Form>
                <FormButton label="Manualmente" onClick={() => setFlag("Manualmente")} /><br/>
                <FormButton label="Generador Cuadrado Medio" onClick={() => setFlag("Cuadrado Medio")} /><br/>
                <FormButton label="Generador Mixto" onClick={() => setFlag("Mixto")} /><br/>
            </Form >
        </GlobalContent >
        )
    }
    else if(flag === "Mixto"){
        return (
        <GlobalContent>
            <FormTitle>Prueba de Rachas</FormTitle>
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

                <FormInput
                    label="Ingrese valor de estadistico con el que desea comparar"
                    name="estadistico"
                    errorHandler={errorHandler}
                    onChange={(event) => setEstadistico(event.target.value)} />

                <DangerLabel message={errorHandler.errorMessage} />

                <FormButtonBar>
                    <FormAcceptButton label="Generar" onClick={acceptClick} />
                    <FormButton label="Cancelar" onClick={() => goHome(props)} />
                </FormButtonBar>
                
                {valorPrueba ? <FormLabel label = {"Resultado"} text={valorPrueba}/> : null}
            </Form >
        </GlobalContent >
        )
    }
    else if(flag === "Cuadrado Medio"){
        return (
            <GlobalContent>
                <FormTitle>Prueba de Rachas</FormTitle>
    
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
    
                    <FormInput
                        label="Ingrese valor de estadistico con el que desea comparar"
                        name="estadistico"
                        errorHandler={errorHandler}
                        onChange={(event) => setEstadistico(event.target.value)} />
    
                    <DangerLabel message={errorHandler.errorMessage} />
    
                    <FormButtonBar>
                        <FormAcceptButton label="Generar" onClick={acceptClick} />
                        <FormButton label="Cancelar" onClick={() => goHome(props)} />
                    </FormButtonBar>
                    
                    {valorPrueba ? <FormLabel label = {"Resultado"} text={valorPrueba}/> : null}
                </Form >
            </GlobalContent >
        )
    }
    else if(flag === "Manualmente"){
    return (
        <GlobalContent>
            <FormTitle>Prueba de Rachas</FormTitle>

            <Form>
                <FormInput
                    label="Ingrese numeros aleatorios separados por coma"
                    name="lista"
                    errorHandler={errorHandler}
                    onChange={(event) => setListaAleatorios(event.target.value)} />

                <FormInput
                    label="Ingrese valor de estadistico con el que desea comparar"
                    name="estadistico"
                    errorHandler={errorHandler}
                    onChange={(event) => setEstadistico(event.target.value)} />

                <DangerLabel message={errorHandler.errorMessage} />

                <FormButtonBar>
                    <FormAcceptButton label="Generar" onClick={acceptClick} />
                    <FormButton label="Cancelar" onClick={() => goHome(props)} />
                </FormButtonBar>
                
                {valorPrueba ? <FormLabel label = {"Resultado"} text={valorPrueba}/> : null}
            </Form >
        </GlobalContent >
    )
    }
    else{
        return null
    }
}