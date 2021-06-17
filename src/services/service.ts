import axios from "axios";
import internal from "stream";
import { environment } from "../app/environment/environment";

export async function generadorMixto(payload: {
    a:number,
    b:number,
    m:number,
    semilla:number
}) :Promise<any>{
    return (await axios.get(environment.backendUrl + "/generadores/mixto", { params: payload })).data
}

export async function generadorCuadradoMedio(payload: {
    cantidad_digitos_deseada:number
    semilla:number
}) :Promise<any>{
    return (await axios.get(environment.backendUrl + "/generadores/cuadradoMedio", { params: payload })).data
}

export async function pruebaRachas(payload: {
    numeros:string
    estadistico:string
}) :Promise<any>{
    return (await axios.get(environment.backendUrl + "/pruebas/rachas", { params: payload })).data
}

export async function pruebaKolmogorov(payload: {
    numeros:string
    estadistico:string
}) :Promise<any>{
    return (await axios.get(environment.backendUrl + "/pruebas/Kolmogorov", { params: payload })).data
}

export async function pruebaChiCuadrado(payload: {
    numeros:string,
    k:string,
    estadistico:string
}) :Promise<any>{
    return (await axios.get(environment.backendUrl + "/pruebas/chiCuadrado", { params: payload })).data
}

export async function transformadaDiscreta(params: {
    dictFrecuencia: any,
    cantVa: string
}) :Promise<any>{
    return (await axios.post(environment.backendUrl + "/variableAleatoria/transformadaDiscreta", params)).data
}

export async function aceptacionRechazo(params: {
    funcion: string,
    a: string,
    b: string,
    M: string,
    cant_va: string
}) :Promise<any>{
    return (await axios.get(environment.backendUrl + "/variableAleatoria/aceptacionRechazo", {params: params})).data
}