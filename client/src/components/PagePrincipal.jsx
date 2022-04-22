import react, { useEffect, useState } from 'react';
import {useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux'
import { dogsAll } from '../actions'



export default function Home(){
    // HOOKS
    const dispatch = useDispatch()  // para utilizar esa constante e ir dispachando mis acciones
    const dogsAll = useSelector((state) => state.dogs) // trae todo lo que esta en el estado de dogs

    useEffect(()=>{
        dispatch(dogsAll())
    }, [])

    function handleButton(e){
        e.preventDefault();   // evita que se recargue la pagina al hacer click
        dispatch(dogsAll())
    }

    return (
    <div>
        <Link to= '/dog'>Crear perro</Link>
        <h1>DOGS HENRY</h1>
        <button onClick={e =>{handleButton(e)}}>
            Cargar de nuevo los perros
        </button>
        <div>
        
        </div>

                 </div>
    )
}