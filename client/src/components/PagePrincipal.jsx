import React, { Fragment } from 'react';
import {useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux'
import { getdogsAll } from '../actions/actions';
import { Link } from 'react-router-dom';



export default function Home(){
    // HOOKS
    const dispatch = useDispatch()  // para utilizar esa constante e ir dispachando mis acciones
    const dogsAll = useSelector((state) => state.dogs) // trae todo lo que esta en el estado de dogs

    useEffect(()=>{
        dispatch(getdogsAll())
    }, [dispatch])

    function handleButton(e){
        e.preventDefault();   // evita que se recargue la pagina al hacer click
        dispatch(getdogsAll());
    }

    return (
    <div>
        <Link to= '/dog'>Crear perro</Link>
        <h1>DOGS HENRY</h1>
        <button onClick={e =>{handleButton(e)}}>
            Cargar de nuevo los perros
        </button>

        <div>
            <select>
                <option value='Alfabetico A-Z'>Alfabetico A-Z</option>
                <option value= 'Alfabetico Z-A'>Alfabetico Z-A</option>
                <option value= 'Peso asc'>Pero ascendente</option>
                <option value= 'Peso desc'>Pero descendente</option>
            </select>

            <select>
                <option value='Creados'>Creados</option>
                <option value='Todos'>Todos</option>
            </select>

            {
                dogsAll?.map( (e) =>{
                    return (
                        <Fragment className= 'cards' >
                            <Link to={'/Home/' + e.id}>
                                <Card name={e.name} image={e.img} temperament={e.temperament} key={e.id} />
                            </Link>
                        </Fragment>
                    )
                })
            }

        </div>

     </div>
    )
}